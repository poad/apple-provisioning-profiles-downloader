import * as process from 'process';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { expect, test } from '@jest/globals';
import downloader from '../lib/downloader.cjs';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
test('token test', async () => {
    const baseDirPath = path.join(os.tmpdir(), 'client');
    if (!fs.existsSync(baseDirPath)) {
        fs.mkdirSync(baseDirPath, { recursive: true });
    }
    const tmp = fs.mkdtempSync(baseDirPath, { encoding: 'utf8' });

    process.env['RUNNER_DEBUG'] = '1';
    const apiKeyId = process.env.API_KEY_ID!;
    const issuerId = process.env.ISSUER_ID!;
    const privateKey = process.env.API_PRIVATE_KEY!;
    const bundleId = process.env.BUNDLE_ID!;
    const profileType = process.env.PROFILE_TYPE!;

    const results = await downloader(privateKey,
        issuerId,
        apiKeyId,
        1200,
        bundleId,
        profileType,
        tmp
        );
    expect(results.length).toBeGreaterThan(0);
});
/* eslint-enable @typescript-eslint/no-non-null-assertion */
