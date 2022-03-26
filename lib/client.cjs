"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const appstore_connect_jwt_generator_core_1 = require("appstore-connect-jwt-generator-core");
class Client {
    jwt;
    constructor(param) {
        const { privateKey, issuerId, apiKeyId, duration } = param;
        this.jwt = (0, appstore_connect_jwt_generator_core_1.tokenSync)(privateKey, issuerId, apiKeyId, duration);
    }
    listBundleIds = async (query) => {
        const queryString = query
            ? Object.entries(query)
                .map(entry => `${entry[0]}=${encodeURIComponent(entry[1])}`)
                .reduce((acc, cur) => `${acc}&${cur}`)
            : '';
        const headers = {
            Authorization: `Bearer ${this.jwt}`
        };
        const uri = `https://api.appstoreconnect.apple.com/v1/bundleIds${queryString.length > 0 ? '?' : ''}${queryString}`;
        const response = await (0, cross_fetch_1.default)(uri, {
            headers
        });
        if (response.status !== 200) {
            const text = await response.text();
            // eslint-disable-next-line no-console
            console.error(text);
            throw new Error(text);
        }
        return response.json();
    };
    token = () => this.jwt;
}
exports.default = Client;
//# sourceMappingURL=client.cjs.map