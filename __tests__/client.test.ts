import * as process from 'process';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import os from 'os';
import path from 'path';

import {expect, test} from '@jest/globals';
import Client from '../lib/client.mjs';
import {type BundleIdsResponse} from '../lib/@types';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
test('token test', () => {
  const baseDirPath = path.join(os.tmpdir(), 'client');
  if (!fs.existsSync(baseDirPath)) {
    fs.mkdirSync(baseDirPath, { recursive: true });
  }
  const tmp = fs.mkdtempSync(baseDirPath, { encoding: 'utf8' });

  process.env['HOME'] = tmp;
  const apiKeyId = process.env.API_KEY_ID!;
  const issuerId = process.env.ISSUER_ID!;
  const privateKey = process.env.API_PRIVATE_KEY!;

  const client = new Client({
    privateKey,
    issuerId,
    apiKeyId
  });

  const token = client.token();
  expect(token).not.toBeUndefined();
  expect(token).not.toBeNull();

  const decoded = jwt.decode(token, {json: true});
  expect(decoded).not.toBeNull();
  expect(decoded!.exp! - decoded!.iat!).toBe(500);
  expect(decoded!.iss!).toBe(issuerId);
});

test('token test', async () => {
  const baseDirPath = path.join(os.tmpdir(), 'client');
  if (!fs.existsSync(baseDirPath)) {
    fs.mkdirSync(baseDirPath, { recursive: true });
  }
  const tmp = fs.mkdtempSync(`${baseDirPath}/`, { encoding: 'utf8' });

  process.env['HOME'] = tmp;
  const bundleId = process.env.BUNDLE_ID!;
  const apiKeyId = process.env.API_KEY_ID!;
  const issuerId = process.env.ISSUER_ID!;
  // const profileType = process.env.PROFILE_TYPE!;
  const privateKey = process.env.API_PRIVATE_KEY!;

  const client = new Client({
    privateKey,
    issuerId,
    apiKeyId
  });

  const token = client.token();
  expect(token).not.toBeUndefined();
  expect(token).not.toBeNull();

  const query = {
    'filter[identifier]': bundleId,
    include: 'profiles',
    'fields[profiles]':
      'bundleId,certificates,createdDate,devices,expirationDate,name,platform,profileContent,profileState,profileType,uuid'
  };

  const response = (await client.listBundleIds(query)) as BundleIdsResponse;
  expect(response).not.toBeUndefined();
  expect(response).not.toBeNull();
  const data = response.data;
  expect(data).not.toBeUndefined();
  expect(data).not.toBeNull();
  expect(data.length).toBeGreaterThan(0);
});

test('token duration test', () => {
  const baseDirPath = path.join(os.tmpdir(), 'client');
  if (!fs.existsSync(baseDirPath)) {
    fs.mkdirSync(baseDirPath, { recursive: true });
  }
  const tmp = fs.mkdtempSync(`${baseDirPath}/`, { encoding: 'utf8' });

  process.env['HOME'] = tmp;
  const apiKeyId = process.env.API_KEY_ID!;
  const issuerId = process.env.ISSUER_ID!;
  const privateKey = process.env.API_PRIVATE_KEY!;

  const client = new Client({
    privateKey,
    issuerId,
    apiKeyId,
    duration: 600
  });

  const token = client.token();
  expect(token).not.toBeUndefined();
  expect(token).not.toBeNull();

  const decoded = jwt.decode(token, {json: true});
  expect(decoded).not.toBeNull();
  expect(decoded!.exp! - decoded!.iat!).toBe(600);
  expect(decoded!.iss!).toBe(issuerId);
});
/* eslint-enable @typescript-eslint/no-non-null-assertion */
