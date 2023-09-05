"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    tokenSync: function() {
        return tokenSync;
    },
    token: function() {
        return token;
    },
    default: function() {
        return _default;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const signOption = (issuerId, privateKeyId, duration)=>({
        algorithm: 'ES256',
        keyid: privateKeyId,
        audience: 'appstoreconnect-v1',
        expiresIn: duration,
        issuer: issuerId
    });
function jwtGenCore() {}
function tokenSync(privateKey, issuerId, privateKeyId, duration = 500) {
    return _jsonwebtoken.default.sign(JSON.parse("{}"), privateKey, signOption(issuerId, privateKeyId, duration));
}
async function token(privateKey, issuerId, privateKeyId, duration = 500) {
    return Promise.resolve(_jsonwebtoken.default.sign(JSON.parse("{}"), privateKey, signOption(issuerId, privateKeyId, duration)));
}
jwtGenCore.tokenSync = tokenSync;
jwtGenCore.token = token;
module.exports = exports = jwtGenCore;
const _default = jwtGenCore;


//# sourceMappingURL=index.cjs.map