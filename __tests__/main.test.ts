import {expect, describe, it} from '@jest/globals';
import * as cp from 'child_process';
import * as path from 'path';
import * as process from 'process';
import fs from 'fs';
import os from 'os';

describe('main test', () => {
  it('test runs', async () => {
    const baseDirPath = path.join(os.tmpdir(), 'main');
    if (!fs.existsSync(baseDirPath)) {
      fs.mkdirSync(baseDirPath, {recursive: true});
    }
    const tmp = fs.mkdtempSync(`${baseDirPath}/`, {encoding: 'utf8'});

    process.env['HOME'] = tmp;
    process.env['INPUT_BUNDLE-ID'] = process.env.BUNDLE_ID;
    process.env['INPUT_PROFILE-TYPE'] = process.env.PROFILE_TYPE;
    process.env['INPUT_ISSUER-ID'] = process.env.ISSUER_ID;
    process.env['INPUT_API-KEY-ID'] = process.env.API_KEY_ID;
    process.env['INPUT_API-PRIVATE-KEY'] = process.env.API_PRIVATE_KEY;

    process.env['ACTIONS_STEP_DEBUG'] = 'true';

    const np = process.execPath;
    const ip = path.join(__dirname, '..', 'dist', 'index.cjs');
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    };
    const ret = cp.execFileSync(np, [ip], options).toString();
    // eslint-disable-next-line no-console
    console.log(ret);

    const profiles = fs.readdirSync(tmp);
    expect(profiles.length).toBeGreaterThan(0);
  });

  it('test runs by file', () => {
    const baseDirPath = path.join(os.tmpdir(), 'main');
    if (!fs.existsSync(baseDirPath)) {
      fs.mkdirSync(baseDirPath, {recursive: true});
    }
    const tmp = fs.mkdtempSync(`${baseDirPath}/`, {encoding: 'utf8'});

    process.env['HOME'] = tmp;
    process.env['INPUT_BUNDLE-ID'] = process.env.BUNDLE_ID;
    process.env['INPUT_PROFILE-TYPE'] = process.env.PROFILE_TYPE;
    process.env['INPUT_ISSUER-ID'] = process.env.ISSUER_ID;
    process.env['INPUT_API-KEY-ID'] = process.env.API_KEY_ID;
    process.env['INPUT_API-PRIVATE-KEY-FILE'] =
      process.env.API_PRIVATE_KEY_FILE;

    process.env['ACTIONS_STEP_DEBUG'] = 'true';

    const np = process.execPath;
    const ip = path.join(__dirname, '..', 'dist', 'index.cjs');
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    };
    const ret = cp.execFileSync(np, [ip], options).toString();
    // eslint-disable-next-line no-console
    console.log(ret);

    const profiles = fs.readdirSync(tmp);
    expect(profiles.length).toBeGreaterThan(0);
  });

  it('test runs with duration', () => {
    const baseDirPath = path.join(os.tmpdir(), 'main');
    if (!fs.existsSync(baseDirPath)) {
      fs.mkdirSync(baseDirPath, {recursive: true});
    }
    const tmp = fs.mkdtempSync(`${baseDirPath}/`, {encoding: 'utf8'});

    process.env['HOME'] = tmp;
    process.env['INPUT_BUNDLE-ID'] = process.env.BUNDLE_ID;
    process.env['INPUT_PROFILE-TYPE'] = process.env.PROFILE_TYPE;
    process.env['INPUT_ISSUER-ID'] = process.env.ISSUER_ID;
    process.env['INPUT_API-KEY-ID'] = process.env.API_KEY_ID;
    process.env['INPUT_API-PRIVATE-KEY'] = process.env.API_PRIVATE_KEY;
    process.env['INPUT_TOKEN-DURATION'] = '30';

    process.env['ACTIONS_STEP_DEBUG'] = 'true';

    const np = process.execPath;
    const ip = path.join(__dirname, '..', 'dist', 'index.cjs');
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    };
    const ret = cp.execFileSync(np, [ip], options).toString();
    // eslint-disable-next-line no-console
    console.log(ret);

    const profiles = fs.readdirSync(tmp);
    expect(profiles.length).toBeGreaterThan(0);
  });
});
