"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmNqcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuY3RzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsOERBQWdDO0FBQ2hDLDZGQUE4RDtBQUM5RCw0RUFBa0Q7QUFDbEQsNEJBQWdCLENBQUMsT0FBTyxDQUFDO0lBQ3ZCLFdBQVcsRUFBRSxNQUFNO0NBQ3BCLENBQUMsQ0FBQztBQVFILE1BQXFCLE1BQU07SUFDekIsR0FBRyxDQUFTO0lBRVosWUFBWSxLQUtYO1FBQ0MsTUFBTSxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxHQUFHLEtBQUssQ0FBQztRQUN6RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUEsK0NBQVMsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBQ0QsYUFBYSxHQUFHLEtBQUssRUFBRSxLQUV0QixFQUE4QixFQUFFO1FBQy9CLE1BQU0sV0FBVyxHQUFHLEtBQUs7WUFDdkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2lCQUNsQixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2lCQUMzRCxNQUFNLENBQUMsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUMxRCxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRVAsTUFBTSxPQUFPLEdBQUc7WUFDZCxhQUFhLEVBQUUsVUFBVSxJQUFJLENBQUMsR0FBRyxFQUFFO1NBQ3BDLENBQUM7UUFFRixNQUFNLEdBQUcsR0FBRyxxREFDVixXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNqQyxHQUFHLFdBQVcsRUFBRSxDQUFDO1FBRWpCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBQSxxQkFBSyxFQUFDLEdBQUcsRUFBRTtZQUNoQyxPQUFPO1NBQ1IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUMzQixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFnQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztJQUNGLEtBQUssR0FBRyxHQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0NBQ2hDO0FBMUNELHlCQTBDQyJ9