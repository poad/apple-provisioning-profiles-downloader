import * as core from '@actions/core';
import * as fs from 'fs';
import * as io from '@actions/io';
import Client from './client.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ProvisioningProfileDownloader = async () => {
    try {
        const bundleId = core.getInput('bundle-id', {
            required: true,
            trimWhitespace: true
        });
        const apiKeyId = core.getInput('api-key-id', {
            required: true,
            trimWhitespace: true
        });
        const issuerId = core.getInput('issuer-id', {
            required: true,
            trimWhitespace: true
        });
        const profileType = core.getInput('profile-type', {
            required: false,
            trimWhitespace: true
        });
        const apiPrivateKey = core.getInput('api-private-key', {
            required: false,
            trimWhitespace: true
        });
        const apiPrivateKeyFile = core.getInput('api-private-key-file', {
            required: false,
            trimWhitespace: true
        });
        const tokenDuration = core.getInput('token-duration', {
            required: false,
            trimWhitespace: true
        });
        if (apiPrivateKey.length === 0) {
            const keyPath = path.resolve(__dirname, apiPrivateKeyFile);
            const apiPrivateKeyFileCheck = fs.statSync(keyPath).isFile() || false;
            if (!apiPrivateKeyFileCheck) {
                throw new Error("Specify either 'api-private-key' or 'api-private-key-file'.");
            }
        }
        if (tokenDuration !== '' && Number.isNaN(tokenDuration)) {
            throw new Error("The 'token-duration' must be an integer value.");
        }
        const duration = tokenDuration !== '' ? Number(tokenDuration) : undefined;
        if (duration !== undefined && (duration < 1 || duration > 1200)) {
            throw new Error("The 'token-duration' must be in the range of 1 to 1200.");
        }
        if (!process.env.HOME) {
            throw new Error('Environment variable `HOME` is not defined!');
        }
        core.info(`bundle-id: ${bundleId}`);
        core.info(`api-key-id: ${apiKeyId}`);
        core.info(`issuer-id: ${issuerId}`);
        core.info(`profile-type: ${profileType}`);
        core.info(`api-private-key: ${apiPrivateKey ? 'specified' : undefined}`);
        core.info(`api-private-key-file: ${apiPrivateKeyFile}`);
        core.info(`token-duration: ${tokenDuration}`);
        const privateKey = apiPrivateKey || fs.readFileSync(path.resolve(apiPrivateKeyFile));
        const client = new Client({
            privateKey,
            issuerId,
            apiKeyId,
            duration
        });
        const response = await client.listBundleIds({
            'filter[identifier]': bundleId,
            include: 'profiles',
            'fields[profiles]': 'bundleId,certificates,createdDate,devices,expirationDate,name,platform,profileContent,profileState,profileType,uuid'
        });
        const bundleIds = response;
        const profileIds = bundleIds.data
            .filter(value => value.attributes.identifier === bundleId &&
            value.relationships.profiles !== undefined)
            .flatMap(bundle => bundle.relationships.profiles?.data)
            .map(data => (data ? data.id : undefined));
        const profiles = bundleIds.included
            .filter(include => include.type === 'profiles' &&
            profileIds.includes(include.id) &&
            include.attributes.profileState === 'ACTIVE' &&
            include.attributes.profileType === profileType)
            .map(include => include);
        const invalidProfile = profiles.find(profile => profile.attributes.uuid === undefined ||
            profile.attributes.profileContent === undefined);
        if (invalidProfile) {
            const attr = Object.keys(invalidProfile)
                .reduce((acc, cur) => `${acc}, ${cur}`);
            throw new Error(`Profile attributes \`uuid\` and \`profileContent\` must be defined! ${attr}`);
        }
        const basePath = path.join(process.env.HOME ? process.env.HOME : '', '/Library/MobileDevice/Provisioning Profiles');
        await io.mkdirP(basePath);
        /* eslint-disable github/array-foreach */
        profiles
            .map(async (profile) => {
            const profileFilename = `${profile.attributes.uuid}.mobileprovision`;
            return {
                fullPath: path.join(basePath, profileFilename),
                profileType: profile.attributes.profileType,
                name: profile.attributes.name,
                content: profile.attributes.profileContent
                    ? profile.attributes.profileContent
                    : ''
            };
        })
            .forEach(async (output) => {
            const buffer = Buffer.from((await output).content, 'base64');
            fs.writeFileSync((await output).fullPath, buffer);
            core.info(`Wrote ${(await output).profileType} profile '${(await output).name}' to '${(await output).fullPath}'.`);
        });
        /* eslint-enable github/array-foreach */
        core.setOutput('profiles', JSON.stringify(profiles.map(value => {
            return {
                name: value.attributes.name,
                udid: value.attributes.uuid,
                type: value.attributes.profileType?.toString()
            };
        })));
    }
    catch (error) {
        if (error instanceof Error) {
            core.error(error);
            core.setFailed(error.message);
        }
        else {
            core.error(JSON.stringify(error));
            core.setFailed(JSON.stringify(error));
        }
    }
};
export default ProvisioningProfileDownloader;
//# sourceMappingURL=main.mjs.map