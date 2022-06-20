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
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const downloader_cjs_1 = __importDefault(require("./downloader.cjs"));
const path_1 = __importDefault(require("path"));
const source_map_support_1 = __importDefault(require("source-map-support"));
source_map_support_1.default.install({
    environment: 'node'
});
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
        (0, downloader_cjs_1.default)(privateKey, issuerId, apiKeyId, duration, bundleId, profileType, basePath)
            .then(profiles => {
            const output = JSON.stringify(profiles.map(value => {
                return {
                    name: value.attributes.name,
                    udid: value.attributes.uuid,
                    type: value.attributes.profileType?.toString()
                };
            }));
            core.setOutput('profiles', output);
        })
            .catch(error => {
            if (error instanceof Error) {
                core.error(error.stack ? error.stack : error);
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
            core.error(error.stack ? error.stack : error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5janMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWFpbi5jdHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0M7QUFDdEMsdUNBQXlCO0FBQ3pCLHNFQUEwQztBQUMxQyxnREFBd0I7QUFDeEIsNEVBQWtEO0FBQ2xELDRCQUFnQixDQUFDLE9BQU8sQ0FBQztJQUN2QixXQUFXLEVBQUUsTUFBTTtDQUNwQixDQUFDLENBQUM7QUFFSSxNQUFNLEdBQUcsR0FBRyxHQUFTLEVBQUU7SUFDNUIsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ2xELFFBQVEsRUFBRSxJQUFJO1lBQ2QsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDM0MsUUFBUSxFQUFFLElBQUk7WUFDZCxjQUFjLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUMxQyxRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztRQUNILE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ2hELFFBQVEsRUFBRSxLQUFLO1lBQ2YsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtZQUNyRCxRQUFRLEVBQUUsS0FBSztZQUNmLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztRQUNILE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUM5RCxRQUFR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