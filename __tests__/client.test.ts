import * as process from 'process'
import {test, expect} from '@jest/globals'
import os from 'os'
import fs from 'fs'
import appStoreConnect from '../src/client'
import jwt from 'jsonwebtoken'

test('token test', () => {
  const tmp = fs.mkdtempSync(`${os.tmpdir()}/`, {encoding: 'utf8'})

  process.env['HOME'] = tmp
  const apiKeyId = process.env.API_KEY_ID!
  const issuerId = process.env.ISSUER_ID!
  const privateKey = process.env.API_PRIVATE_KEY!

  const client = appStoreConnect.Client({
    privateKey,
    issuerId,
    apiKeyId
  })

  const token = client.token()
  expect(token).not.toBeUndefined()
  expect(token).not.toBeNull()

  const decoded = jwt.decode(token, {json: true})
  expect(decoded).not.toBeNull()
  expect(decoded!.exp! - decoded!.iat!).toBe(500)
  expect(decoded!.iss!).toBe(issuerId)
})

test('token test', async () => {
  const tmp = fs.mkdtempSync(`${os.tmpdir()}/`, {encoding: 'utf8'})

  process.env['HOME'] = tmp
  const bundleId = process.env.BUNDLE_ID!
  const apiKeyId = process.env.API_KEY_ID!
  const issuerId = process.env.ISSUER_ID!
  const profileType = process.env.PROFILE_TYPE!
  const privateKey = process.env.API_PRIVATE_KEY!

  const client = appStoreConnect.Client({
    privateKey,
    issuerId,
    apiKeyId
  })

  const token = client.token()
  expect(token).not.toBeUndefined()
  expect(token).not.toBeNull()

  const query = {
    'filter[identifier]': bundleId,
    include: 'profiles',
    'fields[profiles]':
      'bundleId,certificates,createdDate,devices,expirationDate,name,platform,profileContent,profileState,profileType,uuid'
  }

  const response = client.listBundleIds(query)
  expect(response).not.toBeUndefined()
  expect(response).not.toBeNull()
  const data = (await response).data
  expect(data).not.toBeUndefined()
  expect(data).not.toBeNull()
  expect(data.length).toBeGreaterThan(0)
})
