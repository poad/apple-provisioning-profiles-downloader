import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test} from '@jest/globals'
import os from 'os'
import fs from 'fs'

test('test runs', () => {
  const tmp = fs.mkdtempSync(`${os.tmpdir()}/`, {encoding: 'utf8'})

  process.env['HOME'] = tmp
  process.env['INPUT_BUNDLE-ID'] = process.env.BUNDLE_ID
  process.env['INPUT_PROFILE-TYPE'] = process.env.PROFILE_TYPE
  process.env['INPUT_ISSUER-ID'] = process.env.ISSUER_ID
  process.env['INPUT_API-KEY-ID'] = process.env.API_KEY_ID
  process.env['INPUT_API-PRIVATE-KEY'] = process.env.API_PRIVATE_KEY

  process.env['ACTIONS_STEP_DEBUG'] = 'true'

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  cp.execFileSync(np, [ip], options).toString()
  console.log(cp.execFileSync(np, [ip], options).toString())
})

test('test runs by file', () => {
  const tmp = fs.mkdtempSync(`${os.tmpdir()}/`, {encoding: 'utf8'})

  process.env['HOME'] = tmp
  process.env['INPUT_BUNDLE-ID'] = process.env.BUNDLE_ID
  process.env['INPUT_PROFILE-TYPE'] = process.env.PROFILE_TYPE
  process.env['INPUT_ISSUER-ID'] = process.env.ISSUER_ID
  process.env['INPUT_API-KEY-ID'] = process.env.API_KEY_ID
  process.env['INPUT_API-PRIVATE-KEY-FILE'] = process.env.API_PRIVATE_KEY_FILE

  process.env['ACTIONS_STEP_DEBUG'] = 'true'

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  cp.execFileSync(np, [ip], options).toString()
  console.log(cp.execFileSync(np, [ip], options).toString())
})

test('test runs with duration', () => {
  const tmp = fs.mkdtempSync(`${os.tmpdir()}/`, {encoding: 'utf8'})

  process.env['HOME'] = tmp
  process.env['INPUT_BUNDLE-ID'] = process.env.BUNDLE_ID
  process.env['INPUT_PROFILE-TYPE'] = process.env.PROFILE_TYPE
  process.env['INPUT_ISSUER-ID'] = process.env.ISSUER_ID
  process.env['INPUT_API-KEY-ID'] = process.env.API_KEY_ID
  process.env['INPUT_API-PRIVATE-KEY'] = process.env.API_PRIVATE_KEY
  process.env['INPUT_TOKEN-DURATION'] = '30'

  process.env['ACTIONS_STEP_DEBUG'] = 'true'

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  cp.execFileSync(np, [ip], options).toString()
  console.log(cp.execFileSync(np, [ip], options).toString())
})
