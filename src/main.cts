import * as core from '@actions/core';
import * as fs from 'fs';
import downloader from './downloader.cjs';
import path from 'path';
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install({
  environment: 'node'
});

export const run = (): void => {
  try {
    const bundleId: string = core.getInput('bundle-id', {
      required: true,
      trimWhitespace: true
    });
    const apiKeyId = core.getInput('api-key-id', {
      required: true,
      trimWhitespace: true
    });
    const issuerId = core.getInput('issuer-id', {
      required: true,
      trimWhitespace: true
    });
    const profileType = core.getInput('profile-type', {
      required: false,
      trimWhitespace: true
    });
    const apiPrivateKey = core.getInput('api-private-key', {
      required: false,
      trimWhitespace: true
    });
    const apiPrivateKeyFile = core.getInput('api-private-key-file', {
      required: false,
      trimWhitespace: true
    });
    const tokenDuration = core.getInput('token-duration', {
      required: false,
      trimWhitespace: true
    });

    if (apiPrivateKey.length === 0) {
      const keyPath = path.resolve(__dirname, apiPrivateKeyFile);
      const apiPrivateKeyFileCheck = fs.statSync(keyPath).isFile() || false;
      if (!apiPrivateKeyFileCheck) {
        throw new Error(
          "Specify either 'api-private-key' or 'api-private-key-file'."
        );
      }
    }

    if (tokenDuration !== '' && Number.isNaN(tokenDuration)) {
      throw new Error("The 'token-duration' must be an integer value.");
    }

    const duration = tokenDuration !== '' ? Number(tokenDuration) : undefined;
    if (duration !== undefined && (duration < 1 || duration > 1200)) {
      throw new Error(
        "The 'token-duration' must be in the range of 1 to 1200."
      );
    }

    if (!process.env.HOME) {
      throw new Error('Environment variable `HOME` is not defined!');
    }

    core.info(`bundle-id: ${bundleId}`);
    core.info(`api-key-id: ${apiKeyId}`);
    core.info(`issuer-id: ${issuerId}`);
    core.info(`profile-type: ${profileType}`);
    core.info(`api-private-key: ${apiPrivateKey ? 'specified' : undefined}`);
    core.info(`api-private-key-file: ${apiPrivateKeyFile}`);
    core.info(`token-duration: ${tokenDuration}`);

    const privateKey =
      apiPrivateKey || fs.readFileSync(path.resolve(apiPrivateKeyFile));

    const basePath = path.join(
      process.env.HOME ? process.env.HOME : '',
      '/Library/MobileDevice/Provisioning Profiles'
    );

    downloader(
      privateKey,
      issuerId,
      apiKeyId,
      duration,
      bundleId,
      profileType,
      basePath
    ).then((profiles) => {
      const output = JSON.stringify(
        profiles.map(value => {
          return {
            name: value.attributes.name,
            udid: value.attributes.uuid,
            type: value.attributes.profileType?.toString()
          };
        })
      );
      core.setOutput('profiles', output);
    })
      .catch((error) => {
        if (error instanceof Error) {
          core.error(error.stack ? error.stack : error);
          core.setFailed(error.message);
        } else {
          core.error(JSON.stringify(error));
          core.setFailed(JSON.stringify(error));
        }
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.error(error.stack ? error.stack : error);
      core.setFailed(error.message);
    } else {
      core.error(JSON.stringify(error));
      core.setFailed(JSON.stringify(error));
    }
  }
};

run();
