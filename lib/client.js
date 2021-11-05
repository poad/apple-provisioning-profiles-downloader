"use strict";
var _appstoreConnectJwtGeneratorCore = _interopRequireDefault(require("appstore-connect-jwt-generator-core"));
var _crossFetch = _interopRequireDefault(require("cross-fetch"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var appStoreConnect1;
(function(appStoreConnect) {
    let jwt;
    const listBundleIds = async (query)=>{
        const queryString = query ? Object.entries(query).map((entry)=>`${entry[0]}=${encodeURIComponent(entry[1])}`
        ).reduce((acc, cur)=>`${acc}&${cur}`
        ) : '';
        const headers = {
            Authorization: `Bearer ${jwt}`
        };
        const uri = `https://api.appstoreconnect.apple.com/v1/bundleIds${queryString.length > 0 ? '?' : ''}${queryString}`;
        const response = await (0, _crossFetch).default(uri, {
            headers
        });
        if (response.status !== 200) {
            const text = await response.text();
            console.error(text);
            throw new Error(text);
        }
        return response.json();
    };
    appStoreConnect.Client = (param)=>{
        const { privateKey , issuerId , apiKeyId , duration  } = param;
        jwt = _appstoreConnectJwtGeneratorCore.default.tokenSync(privateKey, issuerId, apiKeyId, duration);
        return {
            listBundleIds,
            token: ()=>jwt
        };
    };
})(appStoreConnect1 || (appStoreConnect1 = {
}));

//# sourceMappingURL=client.js.map