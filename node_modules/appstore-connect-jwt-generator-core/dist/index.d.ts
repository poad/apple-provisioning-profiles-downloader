/// <reference types="node" />
export declare module JwtGenerator {
    const tokenSync: (privateKey: string | Buffer, issuerId: string, privateKeyId: string, duration?: number) => string;
    const token: (privateKey: string | Buffer, issuerId: string, privateKeyId: string, duration?: number) => Promise<string>;
}
export default JwtGenerator;
//# sourceMappingURL=index.d.ts.map