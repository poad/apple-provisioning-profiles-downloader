/// <reference types="node" />
import { BundleIdsResponse } from './types';
interface IClient {
    listBundleIds: (query?: {
        [key: string]: string;
    }) => Promise<BundleIdsResponse>;
    token: () => string;
}
declare class Client implements IClient {
    jwt: string;
    constructor(param: {
        privateKey: string | Buffer;
        issuerId: string;
        apiKeyId: string;
        duration?: number;
    });
    listBundleIds: (query?: {
        [key: string]: string;
    } | undefined) => Promise<BundleIdsResponse>;
    token: () => string;
}
export default Client;
//# sourceMappingURL=client.d.ts.map