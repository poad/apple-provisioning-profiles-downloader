"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JwtGenerator;
(function (JwtGenerator) {
    const signOption = (issuerId, privateKeyId, duration) => ({
        algorithm: 'ES256',
        keyid: privateKeyId,
        audience: 'appstoreconnect-v1',
        expiresIn: duration,
        issuer: issuerId,
    });
    JwtGenerator.tokenSync = (privateKey, issuerId, privateKeyId, duration = 500) => jsonwebtoken_1.default.sign({}, privateKey, signOption(issuerId, privateKeyId, duration));
    JwtGenerator.token = async (privateKey, issuerId, privateKeyId, duration = 500) => Promise.resolve(jsonwebtoken_1.default.sign({}, privateKey, signOption(issuerId, privateKeyId, duration)));
})(JwtGenerator = exports.JwtGenerator || (exports.JwtGenerator = {}));
exports.default = JwtGenerator;
//# sourceMappingURL=index.js.map