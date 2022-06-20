import {BundleIdsResponse} from './@types';
import fetch from 'cross-fetch';
import {tokenSync} from 'appstore-connect-jwt-generator-core';
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install({
  environment: 'node'
});
interface IClient {
  listBundleIds: (query?: {
    [key: string]: string;
  }) => Promise<BundleIdsResponse>;
  token: () => string;
}

export default class Client implements IClient {
  jwt: string;

  constructor(param: {
    privateKey: string | Buffer;
    issuerId: string;
    apiKeyId: string;
    duration?: number;
  }) {
    const {privateKey, issuerId, apiKeyId, duration} = param;
    this.jwt = tokenSync(privateKey, issuerId, apiKeyId, duration);
  }
  listBundleIds = async (query?: {
    [key: string]: string;
  }): Promise<BundleIdsResponse> => {
    const queryString = query
      ? Object.entries(query)
          .map(entry => `${entry[0]}=${encodeURIComponent(entry[1])}`)
          .reduce((acc: string, cur: string) => `${acc}&${cur}`)
      : '';

    const headers = {
      Authorization: `Bearer ${this.jwt}`
    };

    const uri = `https://api.appstoreconnect.apple.com/v1/bundleIds${
      queryString.length > 0 ? '?' : ''
    }${queryString}`;

    const response = await fetch(uri, {
      headers
    });

    if (response.status !== 200) {
      const text = await response.text();
      // eslint-disable-next-line no-console
      console.error(text);
      throw new Error(text);
    }
    return response.json() as Promise<BundleIdsResponse>;
  };
  token = (): string => this.jwt;
}
