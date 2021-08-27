"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const io = __importStar(require("@actions/io"));
const client_1 = __importDefault(require("./client"));
const run = async () => {
    try {
        const bundleId = core.getInput('bundle-id');
        const apiKeyId = core.getInput('api-key-id');
        const issuerId = core.getInput('issuer-id');
        const profileType = core.getInput('profile-type');
        const apiPrivateKey = core.getInput('api-private-key');
        const apiPrivateKeyFile = core.getInput('api-private-key-file');
        if (apiPrivateKey === undefined || apiPrivateKey.length === 0) {
            const keyPath = path_1.default.resolve(__dirname, apiPrivateKeyFile);
            const apiPrivateKeyFileCheck = fs.statSync(keyPath).isFile() || false;
            if (!apiPrivateKeyFileCheck) {
                throw new Error("Specify either 'api-private-key' or 'api-private-key-file'。");
            }
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
        const privateKey = apiPrivateKey || fs.readFileSync(path_1.default.resolve(apiPrivateKeyFile));
        const client = client_1.default.Client({
            privateKey,
            issuerId,
            apiKeyId
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
            .flatMap(bundle => bundle.relationships.profiles.data)
            .map(data => data.id);
        const profiles = bundleIds.included
            .filter(include => include.type === 'profiles' &&
            profileIds.includes(include.id) &&
            include.attributes.profileState === 'ACTIVE' &&
            include.attributes.profileType === profileType)
            .map(include => include);
        if (profiles.findIndex(profile => profile.attributes.uuid !== undefined &&
            profile.attributes.profileContent)) {
            throw new Error('Profile attributes `uuid` and `profileContent` must be defined!');
        }
        const basePath = path_1.default.join(process.env.HOME, '/Library/MobileDevice/Provisioning Profiles');
        await io.mkdirP(basePath);
        profiles
            .map(async (profile) => {
            const profileFilename = `${profile.attributes.uuid}.mobileprovision`;
            return {
                fullPath: path_1.default.join(basePath, profileFilename),
                profileType: profile.attributes.profileType,
                name: profile.attributes.name,
                content: profile.attributes.profileContent
            };
        })
            .forEach(async (output) => {
            const buffer = Buffer.from((await output).content, 'base64');
            fs.writeFileSync((await output).fullPath, buffer);
            core.info(`Wrote ${(await output).profileType} profile '${(await output).name}' to '${(await output).fullPath}'.`);
        });
        core.setOutput('profiles', JSON.stringify(profiles.map(value => {
            return {
                name: value.attributes.name,
                udid: value.attributes.uuid,
                type: value.attributes.profileType.toString()
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
run();
//# sourceMappingURL=main.js.map