"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tokenSync = tokenSync;
exports.token = token;
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) {
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
    })
;
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
var _default = jwtGenCore;
exports.default = _default;


//# sourceMappingURL=index.cjs.map