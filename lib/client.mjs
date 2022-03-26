import fetch from 'node-fetch';
import { tokenSync } from 'appstore-connect-jwt-generator-core';
export default class Client {
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
            // eslint-disable-next-line no-console
            console.error(text);
            throw new Error(text);
        }
        return response.json();
    };
    token = () => this.jwt;
}
//# sourceMappingURL=client.mjs.map