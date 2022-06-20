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
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const io = __importStar(require("@actions/io"));
const client_cjs_1 = __importDefault(require("./client.cjs"));
const path_1 = __importDefault(require("path"));
const source_map_support_1 = __importDefault(require("source-map-support"));
source_map_support_1.default.install({
    environment: 'node'
});
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
    const profileIds = response?.data
        ?.filter(value => value.attributes.identifier === bundleId &&
        value.relationships.profiles !== undefined)
        ?.flatMap(bundle => bundle.relationships.profiles?.data)
        ?.map(data => (data ? data.id : undefined));
    const profiles = response?.included
        ?.filter(include => include.type === 'profiles' &&
        profileIds.includes(include.id) &&
        include.attributes.profileState === 'ACTIVE' &&
        include.attributes.profileType === profileType)
        ?.map(include => include);
    if (profiles?.findIndex(profile => profile.attributes.uuid !== undefined &&
        profile.attributes.profileContent)) {
        if (core.isDebug()) {
            core.debug(JSON.stringify(profiles));
        }
        throw new Error('Profile attributes `uuid` and `profileContent` must be defined!');
    }
    await io.mkdirP(basePath);
    core.info(`${profiles?.length} profiles found.`);
    return profiles
        ? Promise.all(profiles
            ?.map(profile => ({
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
        }))
        : [];
};
exports.default = downloader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRlci5janMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZG93bmxvYWRlci5jdHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFzQztBQUN0Qyx1Q0FBeUI7QUFDekIsZ0RBQWtDO0FBQ2xDLDhEQUFrQztBQUVsQyxnREFBd0I7QUFDeEIsNEVBQWtEO0FBQ2xELDRCQUFnQixDQUFDLE9BQU8sQ0FBQztJQUN2QixXQUFXLEVBQUUsTUFBTTtDQUNwQixDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQ3RCLFVBQTJCLEVBQzNCLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLFFBQTRCLEVBQzVCLFFBQWdCLEVBQ2hCLFdBQStCLEVBQy9CLFFBQWdCLEVBQ2hCLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFNLENBQUM7UUFDeEIsVUFBVTtRQUNWLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtLQUNULENBQUMsQ0FBQztJQUVILE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUMxQyxvQkFBb0IsRUFBRSxRQUFRO1FBQzlCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLGtCQUFrQixFQUNoQixxSEFBcUg7S0FDeEgsQ0FBQyxDQUFDO0lBRUgsTUFBTSxVQUFVLEdBQUcsUUFBUSxFQUFFLElBQUk7UUFDL0IsRUFBRSxNQUFNLENBQ04sS0FBSyxDQUFDLEVBQUUsQ0FDTixLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsS0FBSyxRQUFRO1FBQ3hDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FDN0M7UUFDRCxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztRQUN4RCxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxD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