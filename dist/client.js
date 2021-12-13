import JwtGenerator from 'appstore-connect-jwt-generator-core';
import fetch from 'cross-fetch';
class Client {
    constructor(param) {
        this.listBundleIds = async (query) => {
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
        this.token = () => this.jwt;
        const { privateKey, issuerId, apiKeyId, duration } = param;
        this.jwt = JwtGenerator.tokenSync(privateKey, issuerId, apiKeyId, duration);
    }
}
export default Client;
//# sourceMappingURL=client.js.map