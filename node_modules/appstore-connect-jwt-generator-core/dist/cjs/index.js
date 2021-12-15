"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.tokenSync = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signOption = (issuerId, privateKeyId, duration) => ({
    algorithm: 'ES256',
    keyid: privateKeyId,
    audience: 'appstoreconnect-v1',
    expiresIn: duration,
    issuer: issuerId,
});
function tokenSync(privateKey, issuerId, privateKeyId, duration = 500) { return jsonwebtoken_1.default.sign({}, privateKey, signOption(issuerId, privateKeyId, duration)); }
exports.tokenSync = tokenSync;
;
async function token(privateKey, issuerId, privateKeyId, duration = 500) {
    return Promise.resolve(jsonwebtoken_1.default.sign({}, privateKey, signOption(issuerId, privateKeyId, duration)));
}
exports.token = token;
;
//# sourceMappingURL=index.js.map