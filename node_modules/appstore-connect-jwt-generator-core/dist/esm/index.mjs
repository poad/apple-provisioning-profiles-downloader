import jwt from 'jsonwebtoken';
const signOption = (issuerId, privateKeyId, duration) => ({
    algorithm: 'ES256',
    keyid: privateKeyId,
    audience: 'appstoreconnect-v1',
    expiresIn: duration,
    issuer: issuerId,
});
export function tokenSync(privateKey, issuerId, privateKeyId, duration = 500) { return jwt.sign({}, privateKey, signOption(issuerId, privateKeyId, duration)); }
;
export async function token(privateKey, issuerId, privateKeyId, duration = 500) {
    return Promise.resolve(jwt.sign({}, privateKey, signOption(issuerId, privateKeyId, duration)));
}
;
//# sourceMappingURL=index.mjs.map