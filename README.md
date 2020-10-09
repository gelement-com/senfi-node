# Senfi Node.js Library

The Senfi Node library provides convenient access to the Senfi API from applocations in server-side Javascript

## Documentation

See the [`senfi-node` API docs](https://www.senfi.io/docs/api/senfi-node) for Node.js

## Installation

`npm install senfi-node`

## Usage

The package needs to be configured with a Senfi API key and secret, which can be created in the [Senfi CMS][integration-module]. Require it with the key's
value:

<!-- prettier-ignore -->
```js
const senfi = require('senfi')('api-key','api-key-secret');

senfi.getSubscriptions()
  .then(response => console.log(response.subscriptions))
  .catch(error => console.error(error));
```

[integration-module]: https://app.senfi.io/cms/developer
