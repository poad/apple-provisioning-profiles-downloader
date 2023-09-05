"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appstore_connect_jwt_generator_core_1 = require("appstore-connect-jwt-generator-core");
const source_map_support_1 = __importDefault(require("source-map-support"));
source_map_support_1.default.install({
    environment: 'node'
});
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
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmNqcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuY3RzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNkZBQThEO0FBQzlELDRFQUFrRDtBQUNsRCw0QkFBZ0IsQ0FBQyxPQUFPLENBQUM7SUFDdkIsV0FBVyxFQUFFLE1BQU07Q0FDcEIsQ0FBQyxDQUFDO0FBUUgsTUFBcUIsTUFBTTtJQUN6QixHQUFHLENBQVM7SUFFWixZQUFZLEtBS1g7UUFDQyxNQUFNLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBQSwrQ0FBUyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDRCxhQUFhLEdBQUcsS0FBSyxFQUFFLEtBRXRCLEVBQThCLEVBQUU7UUFDL0IsTUFBTSxXQUFXLEdBQUcsS0FBSztZQUN2QixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7aUJBQ2xCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7aUJBQzNELE1BQU0sQ0FBQyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQzFELENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFUCxNQUFNLE9BQU8sR0FBRztZQUNkLGFBQWEsRUFBRSxVQUFVLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDcEMsQ0FBQztRQUVGLE1BQU0sR0FBRyxHQUFHLHFEQUNWLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ2pDLEdBQUcsV0FBVyxFQUFFLENBQUM7UUFFakIsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ2hDLE9BQU87U0FDUixDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQzNCLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25DLHNDQUFzQztZQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7UUFDRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQWdDLENBQUM7SUFDdkQsQ0FBQyxDQUFDO0lBQ0YsS0FBSyxHQUFHLEdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Q0FDaEM7QUExQ0QseUJBMENDIn0=