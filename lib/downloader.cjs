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
    const profileIds = response?.data?.filter(value => value.attributes.identifier === bundleId &&
        value.relationships.profiles !== undefined)?.flatMap(bundle => bundle.relationships.profiles?.data)?.map(data => (data ? data.id : undefined));
    const profiles = response?.included?.filter(include => include.type === 'profiles' &&
        profileIds.includes(include.id) &&
        include.attributes.profileState === 'ACTIVE' &&
        include.attributes.profileType === profileType)?.map(include => include);
    if (profiles?.findIndex(profile => profile.attributes.uuid !== undefined &&
        profile.attributes.profileContent)) {
        if (core.isDebug()) {
            core.debug(JSON.stringify(profiles));
        }
        throw new Error('Profile attributes `uuid` and `profileContent` must be defined!');
    }
    await io.mkdirP(basePath);
    core.info(`${profiles?.length} profiles found.`);
    return profiles ? Promise.all(profiles?.map(profile => ({
        profile,
        fullPath: path_1.default.join(basePath, `${profile.attributes.uuid}.mobileprovision`),
        profileType: profile.attributes.profileType,
        name: profile.attributes.name,
        content: profile.attributes.profileContent
            ? profile.attributes.profileContent
            : ''
    })).map(({ content, fullPath, profileType, name, profile }) => {
        const buffer = Buffer.from(content, 'base64');
        fs.writeFileSync(fullPath, buffer);
        core.info(`Wrote ${profileType} profile '${name}' to '${fullPath}'.`);
        return profile;
    })) : [];
};
exports.default = downloader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRlci5janMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZG93bmxvYWRlci5jdHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFzQztBQUN0Qyx1Q0FBeUI7QUFDekIsZ0RBQWtDO0FBQ2xDLDhEQUFrQztBQUVsQyxnREFBd0I7QUFDeEIsNEVBQWlEO0FBQ2pELDRCQUFnQixDQUFDLE9BQU8sQ0FBQztJQUNyQixXQUFXLEVBQUUsTUFBTTtDQUN0QixDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsVUFBMkIsRUFBRSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsUUFBNEIsRUFBRSxRQUFnQixFQUFFLFdBQStCLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQzVMLE1BQU0sTUFBTSxHQUFHLElBQUksb0JBQU0sQ0FBQztRQUN0QixVQUFVO1FBQ1YsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO0tBQ1gsQ0FBQyxDQUFDO0lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3hDLG9CQUFvQixFQUFFLFFBQVE7UUFDOUIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsa0JBQWtCLEVBQ2QscUhBQXFIO0tBQzVILENBQUMsQ0FBQztJQUVILE1BQU0sVUFBVSxHQUFHLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUNqQyxLQUFLLENBQUMsRUFBRSxDQUNKLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxLQUFLLFFBQVE7UUFDeEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUNqRCxFQUFFLE9BQU8sQ0FDTixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FDL0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFD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