/// <reference types="node" />
import { BundleIdsResponse } from './@types';
declare module appStoreConnect {
    const listBundleIds: (query?: {
        [key: string]: string;
    } | undefined) => Promise<BundleIdsResponse>;
    export const Client: (param: {
        privateKey: string | Buffer;
        issuerId: string;
        apiKeyId: string;
        duration?: number;
    }) => {
        listBundleIds: (query?: {
            [key: string]: string;
        } | undefined) => Promise<BundleIdsResponse>;
        token: () => string;
    };
    export {};
}
export default appStoreConnect;
//# sourceMappingURL=client.d.ts.map