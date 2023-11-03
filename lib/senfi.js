'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');
const qs = require('querystring');

const Action = require('./resource/action');
const Asset = require('./resource/asset');

const Alarm = require('./resource/alarm');
const Bbl = require('./resource/bbl');
const Command = require('./resource/command');
const Connector = require('./resource/connector');
const Event = require('./resource/event');
const EventDefinition = require('./resource/eventdefinition');
const Log = require('./resource/log');
const Measurement = require('./resource/measurement');
const Site = require('./resource/site');
const Subscription = require('./resource/subscription');
const Webhook = require('./resource/webhook');
const Zone = require('./resource/zone');

const DEFAULT_HOST = 'api.senfi.io';
const DEFAULT_PORT = 443;
const DEFAULT_BASE_PATH = '/webservice/';
const DEFAULT_API_MAJOR_VER = 1;
const DEFAULT_API_MINOR_VER = 2;

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

  this.action = new Action(this);
  this.alarm = new Alarm(this);
  this.asset = new Asset(this);
  this.bbl = new Bbl(this);
  this.command = new Command(this);
  this.connector = new Connector(this);
  this.event = new Event(this);
  this.eventdef = new EventDefinition(this);
  this.log = new Log(this);
  this.measurement = new Measurement(this);
  this.site = new Site(this);
  this.subscription = new Subscription(this);
  this.webhook = new Webhook(this);
  this.zone = new Zone(this);
}

Senfi.prototype = {

  /**
   * @typedef {object} InitResponse
   * @param {boolean} success
   * @param {string} [errcode] - "unauthorized", "server_not_found", "server_error", "sdk_exception"
   * @param {string} [errmsg] 
   */
  /**
   * Connects to a broker
   * @param {string} key - Your API key
   * @param {string} secret - Secret to your API key
   * @param {object} [config] - Additional configuration options
   * @param {string} [config.host] - URL of senfi server
   * @param {integer} [config.port] - Port of senfi server
   * @return {Promise<InitResponse>} - Returns success: true if successful; success: false otherwise
   */
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
            resolve({
              success: true
            });
          } else {
            reject(response);
          }
        });
      } catch (ex) {
        reject({
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
      
        callback({
          status: response.status,
          success: true
        })
      } else {
        callback({
          status: response.status,
          success: false,
          errcode: 'server_error',
          errmsg: 'Unexpected response from server: Access token not found in response'
        });
      }
    })
    .catch((error) => {
      if (error.isAxiosError) {
        if (typeof error.response === 'object') {
          if (error.response.status === 401) {
            callback({
              status: error.response.status,
              success: false,
              errcode: 'unauthorized',
              errmsg: 'Unauthorized. Invalid credentials.'
            });
          } else if (error.response.status === 404) {
            callback({
              status: error.response.status,
              success: false,
              errcode: 'server_not_found',
              errmsg: 'Unable to contact server'
            });
          } else {
            callback({
              status: error.response.status,
              success: false,
              errcode: 'server_error',
              errmsg: 'Unexpected response from server: ' + error.response.statusText
            });
          } 
        } else {
          if (error.code) {
            callback({
              status: error.code,
              success: false,
              errcode: 'server_not_found',
              errmsg: 'Unable to contact server. ' + error.message
            });
          } else {
            callback({
              success: false,
              errcode: 'sdk_exception',
              errmsg: error.message
            });
          }
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
          success: true,
          headers:  {
            Authorization: `Bearer ${this._getApiField('token')}`
          }
        });
      } else {
        try {
          this._authenticate((result) => {
            if (result.success === true) {
              resolve({
                success: true,
                headers: {
                  Authorization: `Bearer ${this._getApiField('token')}`
                }
              });
            } else {
              if (result.errcode === 'unauthorized') {
                resolve({
                  success: false,
                  errcode: 'unauthorized',
                  errmsg: 'Authentication error. Invalid credentials.'
                });
              } else {
                resolve({
                  success: false,
                  errcode: 'authentication_error',
                  errmsg: 'Authentication error. ' + result.errmsg
                });
              }
            }
           });
        } catch (ex) {
          resolve({
            success: false,
            errcode: 'authentication_error',
            errmsg: 'Authentication error. ' + ex.errmsg
          });
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
    const authResult = await this._getAuthHeaderBearer();
    if (authResult.success === false) {
      callback(authResult);
      return;
    }
    // Add content type header
    let headers = authResult.headers;
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
      callback({
        status: response.status,
        ...response.data
      });
    })
    .catch((error) => {
      if (error.isAxiosError) {
        if (typeof error.response === 'object') {
          // Check if it is Senfi API returning a response object
          if (typeof error.response.data === 'object' && error.response.data !== null && typeof error.response.data.success === 'boolean') {
            callback({
              status: error.response.status,
              ...error.response.data
            });
          // Check for 404. Probably means invalid host or port or server is offline
          } else if (error.response && error.response.status === 404) {
            callback({
              status: error.response.status,
              success: false,
              errcode: 'server_not_found',
              errmsg: 'Unable to contact server'
            });
          // For everything else
          } else {
            callback({
              status: error.response.status,
              success: false,
              errcode: 'server_error',
              errmsg: 'Unexpected response from server: ' + error.response.statusText
            });
          }
        } else {
          if (error.code) {
            callback({
              status: error.code,
              success: false,
              errcode: 'server_not_found',
              errmsg: 'Unable to contact server. ' + error.message
            });
          } else {
            callback({
              success: false,
              errcode: 'sdk_exception',
              errmsg: error.message
            });
          }
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
  async httpRequest_1_0(method, path, body, callback) {
    if (this._api === undefined) throw new Error('Senfi is uninitialized');

    const baseUrl = `https://${this._getApiField('host')}:${this._getApiField('port')}${this._getApiField('basePath')}1/0`;

    // Build headers
    const authResult = await this._getAuthHeaderBearer();
    if (authResult.success === false) {
      callback(authResult);
      return;
    }
    // Add content type header
    let headers = authResult.headers;
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
      callback({
        status: response.status,
        ...response.data
      });
    })
    .catch((error) => {
      if (error.isAxiosError) {
        if (typeof error.response === 'object') {
          // Check if it is Senfi API returning a response object
          if (typeof error.response.data === 'object' && error.response.data !== null && typeof error.response.data.success === 'boolean') {
            callback({
              status: error.response.status,
              ...error.response.data
            });
          // Check for 404. Probably means invalid host or port or server is offline
          } else if (error.response && error.response.status === 404) {
            callback({
              status: error.response.status,
              success: false,
              errcode: 'server_not_found',
              errmsg: 'Unable to contact server'
            });
          // For everything else
          } else {
            callback({
              status: error.response.status,
              success: false,
              errcode: 'server_error',
              errmsg: 'Unexpected response from server: ' + error.response.statusText
            });
          }
        } else {
          if (error.code) {
            callback({
              status: error.code,
              success: false,
              errcode: 'server_not_found',
              errmsg: 'Unable to contact server. ' + error.message
            });
          } else {
            callback({
              success: false,
              errcode: 'sdk_exception',
              errmsg: error.message
            });
          }
        }
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
