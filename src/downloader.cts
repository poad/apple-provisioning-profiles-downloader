import * as core from '@actions/core';
import * as fs from 'fs';
import * as io from '@actions/io';
import Client from './client.cjs';
import { Profile } from './@types';
import path from 'path';
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install({
    environment: 'node'
});

const downloader = async (privateKey: string | Buffer, issuerId: string, apiKeyId: string, duration: number | undefined, bundleId: string, profileType: string | undefined, basePath: string) => {
    const client = new Client({
        privateKey,
        issuerId,
        apiKeyId,
        duration
    });

    const response = await client.listBundleIds({
        'filter[identifier]': bundleId,
        include: 'profiles',
        'fields[profiles]':
            'bundleId,certificates,createdDate,devices,expirationDate,name,platform,profileContent,profileState,profileType,uuid'
    });

    const profileIds = response?.data?.filter(
            value =>
                value.attributes.identifier === bundleId &&
                value.relationships.profiles !== undefined
        )?.flatMap(
            bundle => bundle.relationships.profiles?.data)?.map(
                data => (data ? data.id : undefined));

    const profiles = response?.included?.filter(
            include =>
                include.type === 'profiles' &&
                profileIds.includes(include.id) &&
                include.attributes.profileState === 'ACTIVE' &&
                include.attributes.profileType === profileType
        )?.map(
            include => include as Profile);

    if (
        profiles?.findIndex(
            profile =>
                profile.attributes.uuid !== undefined &&
                profile.attributes.profileContent
        )
    ) {
        if (core.isDebug()) {
            core.debug(JSON.stringify(profiles));
        }
        throw new Error(
            'Profile attributes `uuid` and `profileContent` must be defined!'
        );
    }

    await io.mkdirP(basePath);

    core.info(`${profiles?.length} profiles found.`);

    return profiles ? Promise.all(profiles?.map(profile => ({
            profile,
            fullPath: path.join(basePath, `${profile.attributes.uuid}.mobileprovision`),
            profileType: profile.attributes.profileType,
            name: profile.attributes.name,
            content: profile.attributes.profileContent
                ? profile.attributes.profileContent
                : ''
        })).map(({ content, fullPath, profileType, name, profile }) => {
            const buffer = Buffer.from(content, 'base64');
            fs.writeFileSync(fullPath, buffer);
            core.info(
                `Wrote ${profileType} profile '${name}' to '${fullPath}'.`
            );
            return profile;
        })) : [];
};

export default downloader;