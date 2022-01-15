# appstore-connect-jwt-token-generator-core

[![npm version](https://badge.fury.io/js/appstore-connect-jwt-generator-core.svg)](https://badge.fury.io/js/appstore-connect-jwt-generator-core)

Generate the JWT for App Store Connect API.

```typescript
import jwt from 'appstore-connect-jwt-generator-core';
import * as fs from 'fs';

const cert = fs.readFileSync('Path of certificate file', { flag: 'r' });
const token = jwt.tokenSync(cert, 'App Store Connect Issuer ID', 'App Store Connect Key ID');
```

## Installation

```sh
npm i appstore-connect-jwt-token-generator-core
```

or

```sh
yarn add appstore-connect-jwt-token-generator-core
```

## Refernce

<https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests>
