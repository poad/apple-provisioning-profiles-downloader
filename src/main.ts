import * as core from '@actions/core'
import * as fs from 'fs'
import path from 'path'
import {BundleIdsResponse, ErrorResponse, Profile} from './types'
import * as io from '@actions/io'
import appStoreConnect from './client'

const run = async (): Promise<void> => {
  try {
    const bundleId: string = core.getInput('bundle-id')
    const apiKeyId = core.getInput('api-key-id')
    const issuerId = core.getInput('issuer-id')
    const profileType = core.getInput('profile-type')
    const apiPrivateKey = core.getInput('api-private-key')
    const apiPrivateKeyFile = core.getInput('api-private-key-file')

    if (apiPrivateKey === undefined || apiPrivateKey.length === 0) {
      const keyPath = path.resolve(__dirname, apiPrivateKeyFile)
      const apiPrivateKeyFileCheck = fs.statSync(keyPath).isFile() || false
      if (!apiPrivateKeyFileCheck) {
        throw new Error(
          "Specify either 'api-private-key' or 'api-private-key-file'。"
        )
      }
    }

    if (!process.env.HOME) {
      throw new Error('Environment variable `HOME` is not defined!')
    }

    core.info(`bundle-id: ${bundleId}`)
    core.info(`api-key-id: ${apiKeyId}`)
    core.info(`issuer-id: ${issuerId}`)
    core.info(`profile-type: ${profileType}`)
    core.info(`api-private-key: ${apiPrivateKey ? 'specified' : undefined}`)
    core.info(`api-private-key-file: ${apiPrivateKeyFile}`)

    const privateKey =
      apiPrivateKey ||
      fs.readFileSync(path.resolve(__dirname, apiPrivateKeyFile))

    const client = appStoreConnect.Client({
      privateKey,
      issuerId,
      apiKeyId
    })

    const response = await client.listBundleIds({
      'filter[identifier]': bundleId,
      include: 'profiles',
      'fields[profiles]':
        'bundleId,certificates,createdDate,devices,expirationDate,name,platform,profileContent,profileState,profileType,uuid'
    })

    const bundleIds = response as BundleIdsResponse

    const profileIds = bundleIds.data
      .filter(
        value =>
          value.attributes.identifier === bundleId &&
          value.relationships.profiles !== undefined
      )
      .flatMap(bundle => bundle.relationships.profiles!.data)
      .map(data => data.id)

    const profiles = bundleIds.included
      .filter(
        include =>
          include.type === 'profiles' &&
          profileIds.includes(include.id) &&
          include.attributes.profileState === 'ACTIVE' &&
          include.attributes.profileType === profileType
      )
      .map(include => include as Profile)

    if (
      profiles.findIndex(
        profile =>
          profile.attributes.uuid !== undefined &&
          profile.attributes.profileContent
      )
    ) {
      throw new Error(
        'Profile attributes `uuid` and `profileContent` must be defined!'
      )
    }
    const basePath = path.join(
      process.env.HOME!,
      '/Library/MobileDevice/Provisioning Profiles'
    )
    await io.mkdirP(basePath)

    profiles
      .map(async profile => {
        const profileFilename = `${profile.attributes.uuid}.mobileprovision`
        return {
          fullPath: path.join(basePath, profileFilename),
          profileType: profile.attributes.profileType,
          name: profile.attributes.name,
          content: profile.attributes.profileContent!
        }
      })
      .forEach(async output => {
        const buffer = Buffer.from((await output).content, 'base64')
        fs.writeFileSync((await output).fullPath, buffer)
        core.info(
          `Wrote ${(await output).profileType} profile '${
            (await output).name
          }' to '${(await output).fullPath}'.`
        )
      })
    core.setOutput(
      'profiles',
      JSON.stringify(
        profiles.map(value => {
          return {
            name: value.attributes.name,
            udid: value.attributes.uuid,
            type: value.attributes.profileType!.toString()
          }
        })
      )
    )
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
