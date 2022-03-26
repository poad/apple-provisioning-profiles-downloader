"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const io = __importStar(require("@actions/io"));
const client_cjs_1 = __importDefault(require("./client.cjs"));
const path_1 = __importDefault(require("path"));
const downloader = async (privateKey, issuerId, apiKeyId, duration, bundleId, profileType, basePath) => {
    const client = new client_cjs_1.default({
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
    const profileIds = response.data
        .filter(value => value.attributes.identifier === bundleId &&
        value.relationships.profiles !== undefined)
        .flatMap(bundle => bundle.relationships.profiles?.data)
        .map(data => (data ? data.id : undefined));
    const profiles = response.included
        .filter(include => include.type === 'profiles' &&
        profileIds.includes(include.id) &&
        include.attributes.profileState === 'ACTIVE' &&
        include.attributes.profileType === profileType)
        .map(include => include);
    if (profiles.findIndex(profile => profile.attributes.uuid !== undefined &&
        profile.attributes.profileContent)) {
        if (core.isDebug()) {
            core.debug(JSON.stringify(profiles));
        }
        throw new Error('Profile attributes `uuid` and `profileContent` must be defined!');
    }
    await io.mkdirP(basePath);
    core.info(`${profiles.length} profiles found.`);
    return Promise.all(profiles
        .map(profile => ({
        profile,
        fullPath: path_1.default.join(basePath, `${profile.attributes.uuid}.mobileprovision`),
        profileType: profile.attributes.profileType,
        name: profile.attributes.name,
        content: profile.attributes.profileContent
            ? profile.attributes.profileContent
            : ''
    }))
        .map(({ content, fullPath, profileType, name, profile }) => {
        const buffer = Buffer.from(content, 'base64');
        fs.writeFileSync(fullPath, buffer);
        core.info(`Wrote ${profileType} profile '${name}' to '${fullPath}'.`);
        return profile;
    }));
};
exports.default = downloader;
//# sourceMappingURL=downloader.cjs.map