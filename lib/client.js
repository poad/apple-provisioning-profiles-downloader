"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appstore_connect_jwt_generator_core_1 = __importDefault(require("appstore-connect-jwt-generator-core"));
const node_fetch_1 = __importDefault(require("node-fetch"));
var appStoreConnect;
(function (appStoreConnect) {
    let jwt;
    const listBundleIds = async (query) => {
        const queryString = query
            ? Object.entries(query)
                .map(entry => `${entry[0]}=${encodeURIComponent(entry[1])}`)
                .reduce((acc, cur) => `${acc}&${cur}`)
            : '';
        const headers = {
            Authorization: `Bearer ${jwt}`
        };
        const uri = `https://api.appstoreconnect.apple.com/v1/bundleIds${queryString.length > 0 ? '?' : ''}${queryString}`;
        const response = await (0, node_fetch_1.default)(uri, {
            headers
        });
        if (response.status !== 200) {
            const text = await response.text();
            console.error(text);
            throw new Error(text);
        }
        return response.json();
    };
    appStoreConnect.Client = (param) => {
        const { privateKey, issuerId, apiKeyId } = param;
        jwt = appstore_connect_jwt_generator_core_1.default.tokenSync(privateKey, issuerId, apiKeyId);
        return {
            listBundleIds,
            token: () => jwt
        };
    };
})(appStoreConnect || (appStoreConnect = {}));
exports.default = appStoreConnect;
//# sourceMappingURL=client.js.map