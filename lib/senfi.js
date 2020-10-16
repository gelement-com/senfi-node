'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');
const qs = require('querystring');

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
        key: key || '',
        secret: secret || '',
        token: null,
        tokenExpiry: null,
      host: props.host || DEFAULT_HOST,
      port: props.port || DEFAULT_PORT,
      basePath: DEFAULT_BASE_PATH,
      apiMajorVer: props.apiMinorVer || DEFAULT_API_MAJOR_VER,
      apiMinorVer: props.apiMinorVer || DEFAULT_API_MINOR_VER,
      dev: false,
    };

      // Retrieve oauth2 token
      try {
        this._authenticate(response => {
          if (response.success === true) {
            resolve(true);
            } else {
            reject('Initialization failed: ' + response.errmsg);
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
  _authenticate(callback) {
    const baseUrl = `https://${this._getApiField('host')}:${this._getApiField('port')}${this._getApiField('basePath')}${this._getApiField('apiMajorVer')}/${this._getApiField('apiMinorVer')}`;

    // build request
    let options = {
      baseURL: baseUrl,
      url: '/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        client_id: this._getApiField('key'),
        client_secret: this._getApiField('secret'),
        grant_type: 'client_credentials',
      })
    };

    axios(options)
    .then((response) => {
      const data = response.data;
      if (data.access_token) {
        this._setApiField('token', `${data.access_token}`);
        this._setApiField('tokenExpiry', new Date((new Date().getTime() + (data.expires_in - 600) * 1000)));
    }
      callback({
        success: true
      })
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          callback({
            success: false,
            errcode: 'unauthorized',
            errmsg: 'Unauthorized'
          });
        } else if (error.response.status === 404) {
          callback({
            success: false,
            errcode: 'server_not_found',
            errmsg: 'Unable to contact server'
          });
        } else {
          callback({
            success: false,
            errcode: 'sdk_exception',
            errmsg: error.message
          });
        }
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
  _getAuthHeaderBearer() {
    return new Promise((resolve, reject) => {
      if (this._getApiField('tokenExpiry') > new Date()) {
        resolve({
          Authorization: `Bearer ${this._getApiField('token')}`
        });
      } else {
        try {
          this._authenticate((result) => {
            if (result.success === true) {
              resolve({
                Authorization: `Bearer ${this._getApiField('token')}`
              });
            } else {
              reject(null);
            }
           });
        } catch (ex) {
          reject(null);
        }
      }
    });
  },

  /**
   * @private
   */
  _getAuthHeaderBasic() {
    const encoded = new Buffer.from(`${this._getApiField('key')}:${this._getApiField('secret')}`).toString('base64');
    return {
      Authorization: `Basic ${encoded}`
    };
  },

  /**
   * @private
   */
  async httpRequest(method, path, body, callback) {
    if (this._api === undefined) throw new Error('Senfi is uninitialized');

    const baseUrl = `https://${this._getApiField('host')}:${this._getApiField('port')}${this._getApiField('basePath')}${this._getApiField('apiMajorVer')}/${this._getApiField('apiMinorVer')}`;

    // Build headers
    const headers = await this._getAuthHeaderBearer();
    if (headers === null) {
      callback({
        success: false,
        errcode: 'sdk_exception',
        errmsg: error.message
      })
      return;
    }
    // Add content type header
    headers['Content-Type'] = 'application/json';

    // Build request options
    let options = {
      baseURL: baseUrl,
      url: path,
      method: method,
      headers: headers,
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
  async ingestorRequest(measurementCode, data, type, callback) {
    if (this._api === undefined) throw new Error('Senfi is uninitialized');

    const url = `https://${this._getApiField('host')}:${this._getApiField('port')}/ingestor/2/0/${type}/array/${this._getApiField('key')}/${measurementCode}`;

    // Build headers
    const headers = await this._getAuthHeaderBasic();
    if (headers === null) {
      callback({
        success: false,
        errcode: 'sdk_exception',
        errmsg: error.message
      })
      return;
    }
    // Add content type header
    headers['Content-Type'] = 'application/json';

    // build request
    let options = {
      url: url,
      method: 'post',
      headers: headers,
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
