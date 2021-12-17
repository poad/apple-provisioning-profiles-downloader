import { tokenSync } from 'appstore-connect-jwt-generator-core';
import fetch from 'cross-fetch';
export class Client {
    jwt;
    constructor(param) {
        const { privateKey, issuerId, apiKeyId, duration } = param;
        this.jwt = tokenSync(privateKey, issuerId, apiKeyId, duration);
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
        const response = await fetch(uri, {
            headers
        });
        if (response.status !== 200) {
            const text = await response.text();
            console.error(text);
            throw new Error(text);
        }
        return response.json();
    };
    token = () => this.jwt;
}
export default Client;
//# sourceMappingURL=client.js.map