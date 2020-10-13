'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');

const Webhook = require('./resource/webhook');
const Subscription = require('./resource/subscription');
const Measurement = require('./resource/measurement');
const Event = require('./resource/event');
const Alarm = require('./resource/alarm');
const Log = require('./resource/log');
const Command = require('./resource/command');
const Bbl = require('./resource/bbl');
const Asset = require('./resource/asset');
const Action = require('./resource/action');

const DEFAULT_HOST = 'api.senfi.io';
const DEFAULT_PORT = 443;
const DEFAULT_BASE_PATH = '/api-services/';
const DEFAULT_API_MAJOR_VER = 1;
const DEFAULT_API_MINOR_VER = 0;

const ALLOWED_CONFIG_PROPERTIES = [
  'key',
  'secret',
  'host',
  'port',
  'apiMajorVer',
  'apiMinorVer'
];

function Senfi() {
  if (!(this instanceof Senfi)) {
    return new Senfi();
  }

  this.webhook = new Webhook(this);
  this.subscription = new Subscription(this);
  this.measurement = new Measurement(this);
  this.event = new Event(this);
  this.alarm = new Alarm(this);
  this.log = new Log(this);
  this.command = new Command(this);
  this.bbl = new Bbl(this);
  this.asset = new Asset(this);
  this.action = new Action(this);
}

Senfi.prototype = {

  initialize(key, secret, config = {}) {
    return new Promise((resolve, reject) => {
    const props = this._getPropsFromConfig(config);

    this._api = {
      key: props.key || '',
      secret: props.secret || '',
      auth: null,
      host: props.host || DEFAULT_HOST,
      port: props.port || DEFAULT_PORT,
      basePath: DEFAULT_BASE_PATH,
      apiMajorVer: props.apiMinorVer || DEFAULT_API_MAJOR_VER,
      apiMinorVer: props.apiMinorVer || DEFAULT_API_MINOR_VER,
      dev: false,
    };

    this._setAuthenticationKey(key, secret);

      // Contact the server for a positive response
      try {
        this.httpRequest('get', '/webhook', {}, function(res) {
          if (res.success === true) {
            resolve();
          } else {
            if (res.errcode === 'unauthorized') {
              reject('Initialization failed: Unauthorized');
            } else if (res.errcode === 'server_not_found') {
              reject('Initialization failed: Invalid host or port');
            } else {
              reject('Initialization failed: ' + res.errmsg);
            }
          }
        });
      } catch (ex) {
        reject('Initialization failed: ' + ex.message);
      }
    });
  },

  /**
   * @private
   */
  _getPropsFromConfig(config) {
    // If config is null or undefined, just bail early with no props
    if (!config) {
      return {};
    }

    const isObject = config === Object(config) && !Array.isArray(config);
    if (!isObject) {
      throw new Error('Config must be an object');
    }

    // If config is an object, make sure it doesn't contain any unexpected values
    const values = Object.keys(config).filter(
      (value) => !ALLOWED_CONFIG_PROPERTIES.includes(value)
    );

    if (values.length > 0) {
      throw new Error(
        `Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(
          ', '
        )}`
      );
    }

    return config;
  },

  /**
   * @private
   */
  _setApiField(key, value) {
    this._api[key] = value;
  },

  /**
   * @private
   */
  _getApiField(key) {
    return this._api[key];
  },

  /**
   * @private
   */
  _setAuthenticationKey(key, secret) {
    if (typeof key === 'string' & typeof secret === 'string') {
      const encoded = new Buffer.from(`${key}:${secret}`).toString('base64');
      this._setApiField('auth', `Basic ${encoded}`);
      this._setApiField('key', key);
      this._setApiField('secret', secret);
    }
  },

  /**
   * @private
   */
  httpRequest(method, path, body, callback) {
    if (this._api === undefined) throw new Error('Senfi is uninitialized');

    const baseUrl = `https://${this._getApiField('host')}:${this._getApiField('port')}${this._getApiField('basePath')}${this._getApiField('apiMajorVer')}/${this._getApiField('apiMinorVer')}`;

    // build request
    let options = {
      baseURL: baseUrl,
      url: path,
      method: method,
      headers: {
        'Authorization': this._getApiField('auth'),
        'Content-Type': 'application/json'
      },
      data: body
    };

    axios(options)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      // Check if it is Senfi API returning 400, 404 or 500s
      if (error.response && error.response.data && typeof error.response.data.success === 'boolean') {
        callback(error.response.data);
      // Check for 401 unauthorized
      } else if (error.response && error.response.status === 401) {
        callback({
          success: false,
          errcode: 'unauthorized',
          errmsg: 'Unauthorized'
        });
      // Check for 404. Probably means invalid host or port or server is offline
      } else if (error.response && error.response.status === 404) {
        callback({
          success: false,
          errcode: 'server_not_found',
          errmsg: 'Unable to contact server'
        });
      // For everything else
      } else {
        callback({
          success: false,
          errcode: 'sdk_exception',
          errmsg: error.message
        });
      }
    });
  },

  /**
   * @private
   */
  ingestorRequest(measurementCode, data, type, callback) {
    if (this._api === undefined) throw new Error('Senfi is uninitialized');

    const url = `https://${this._getApiField('host')}:${this._getApiField('port')}/ingestor/2/0/${type}/array/${this._getApiField('key')}/${measurementCode}`;

    // build request
    let options = {
      url: url,
      method: 'post',
      headers: {
        'Authorization': this._getApiField('auth'),
        'Content-Type': 'application/json'
      },
      data: {
        data
      }
    };

    axios(options)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      // Check if it is Senfi API returning 400, 404 or 500s
      if (error.response && error.response.data && typeof error.response.data.success === 'boolean') {
        callback(error.response.data);
      // Check for 401 unauthorized
      } else if (error.response && error.response.status === 401) {
        callback({
          success: false,
          errcode: 'unauthorized',
          errmsg: 'Unauthorized'
        });
      // Check for 404. Probably means invalid host or port or server is offline
      } else if (error.response && error.response.status === 404) {
        callback({
          success: false,
          errcode: 'server_not_found',
          errmsg: 'Unable to contact server'
        });
      // For everything else
      } else {
        callback({
          success: false,
          errcode: 'sdk_exception',
          errmsg: error.message
        });
      }
    });
  }
};

module.exports = Senfi;

// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Senfi = Senfi;

// Allow use with the TypeScript compiler without `esModuleInterop`.
// We may also want to add `Object.defineProperty(exports, "__esModule", {value: true});` in the future, so that Babel users will use the `default` version.
module.exports.default = Senfi;
