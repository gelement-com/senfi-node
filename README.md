# Senfi Node.js Library

The Senfi Node library provides convenient access to the Senfi API from applications in server-side Javascript

## Documentation

See the [Senfi API docs](https://www.senfi.io/docs/api/1/0/)

## Installation

`npm install senfi`

## Usage

The package needs to be initialized with a Senfi API key and secret, which can be created in the [Senfi CMS][integration-module]. Initialize using the key values:

<!-- prettier-ignore -->
```js
const Senfi = require('senfi');
let senfi = new Senfi();
senfi.initialize('api-key','api-key-secret')
  .then(() => console.log('initialized'))
  .catch(error => console.error('Initialization failed:', error.errmsg));
```

Example usage:

<!-- prettier-ignore -->
```js
senfi.subscription.get()
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

[integration-module]: https://app.senfi.io/cms/developer
