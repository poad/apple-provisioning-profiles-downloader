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
exports.run = void 0;
require("source-map-support/register");
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const downloader_cjs_1 = __importDefault(require("./downloader.cjs"));
const path_1 = __importDefault(require("path"));
const run = () => {
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
            const keyPath = path_1.default.resolve(__dirname, apiPrivateKeyFile);
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
        const privateKey = apiPrivateKey || fs.readFileSync(path_1.default.resolve(apiPrivateKeyFile));
        const basePath = path_1.default.join(process.env.HOME ? process.env.HOME : '', '/Library/MobileDevice/Provisioning Profiles');
        (0, downloader_cjs_1.default)(privateKey, issuerId, apiKeyId, duration, bundleId, profileType, basePath).then((profiles) => {
            const output = JSON.stringify(profiles.map(value => {
                return {
                    name: value.attributes.name,
                    udid: value.attributes.uuid,
                    type: value.attributes.profileType?.toString()
                };
            }));
            core.setOutput('profiles', output);
        })
            .catch((error) => {
            if (error instanceof Error) {
                core.error(error);
                core.setFailed(error.message);
            }
            else {
                core.error(JSON.stringify(error));
                core.setFailed(JSON.stringify(error));
            }
        });
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
exports.run = run;
(0, exports.run)();
//# sourceMappingURL=main.cjs.map