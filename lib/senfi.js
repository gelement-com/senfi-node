'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const axios = require('axios');

const DEFAULT_HOST = 'api.dev.senfi.io';
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

function Senfi(key, secret, config = {}) {
  if (!(this instanceof Senfi)) {
    return new Senfi(key, secret, config);
  }

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
}

Senfi.prototype = {

  setWebhook(url) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof url !== 'string') {
          reject({
            success: false,
            errmsg: 'Invalid arguments',
            errcode: 'invalid_argument'
          });
          return;
        }

        this._httpRequest('put', '/webhook', {
          webhook: webhook
        }, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  getWebhook() {
    return new Promise((resolve, reject) => {
      try {
        this._httpRequest('get', '/webhook', {}, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  getSubscriptions() {
    return new Promise((resolve, reject) => {
      try {
        this._httpRequest('get', '/subscription', {}, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  subscribeMeasurement(subscriptionOptions) {
    return new Promise((resolve, reject) => {
      // Check for any unexpected values
      const ALLOWED_SUB_PROPERTIES = ['measurement_code'];
      const values = Object.keys(subscriptionOptions).filter(
        (value) => !ALLOWED_SUB_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }
      // Note: Let API handle type checking

      let options = subscriptionOptions;
      if (subscriptionOptions === null || subscriptionOptions === undefined) {
        options = {};
      }

      try {
        this._httpRequest('post', '/subscribe/measurement', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  subscribeEvent(subscriptionOptions) {
    return new Promise((resolve, reject) => {
      // Check for any unexpected values
      const ALLOWED_SUB_PROPERTIES = ['event_def_id', 'site_id', 'asset_id', 'tag', 'event_source'];
      const values = Object.keys(subscriptionOptions).filter(
        (value) => !ALLOWED_SUB_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }
      // Note: Let API handle type checking

      let options = subscriptionOptions;
      if (subscriptionOptions === null || subscriptionOptions === undefined) {
        options = {};
      }

      try {
        this._httpRequest('post', '/subscribe/event', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  subscribeAlarm(subscriptionOptions) {
    return new Promise((resolve, reject) => {
      // Check for any unexpected values
      const ALLOWED_SUB_PROPERTIES = ['site_id', 'asset_id', 'event_def_id'];
      const values = Object.keys(subscriptionOptions).filter(
        (value) => !ALLOWED_SUB_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }
      // Note: Let API handle type checking

      let options = subscriptionOptions;
      if (subscriptionOptions === null || subscriptionOptions === undefined) {
        options = {};
      }

      try {
        this._httpRequest('post', '/subscribe/alarm', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  subscribeLog(subscriptionOptions) {
    return new Promise((resolve, reject) => {
      // Check for any unexpected values
      const ALLOWED_SUB_PROPERTIES = ['component', 'severity'];
      const values = Object.keys(subscriptionOptions).filter(
        (value) => !ALLOWED_SUB_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }
      // Note: Let API handle type checking

      let options = subscriptionOptions;
      if (subscriptionOptions === null || subscriptionOptions === undefined) {
        options = {};
      }

      try {
        this._httpRequest('post', '/subscribe/log', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  subscribeCommand(subscriptionOptions) {

  },

  unsubscribe(token) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof token !== 'string') {
          reject({
            success: false,
            errmsg: 'Invalid arguments',
            errcode: 'invalid_argument'
          });
          return;
        }

        this._httpRequest('post', '/unsubscribe', {
          token: token
        }, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointInBuilding(siteId, posX, posY, posZ, buildingBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId
        };
        // Note: Let API handle type checking

        this._httpRequest('get', '/bbl/isPointInBuilding', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointInBlock(siteId, posX, posY, posZ, buildingBblId, blockBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId
        };
        // Note: Let API handle type checking

        this._httpRequest('get', '/bbl/isPointInBlock', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointOnLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._httpRequest('get', '/bbl/isPointOnLevel', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointAboveLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._httpRequest('get', '/bbl/isPointAboveLevel', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointAboveOrOnLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking
        this._httpRequest('get', '/bbl/isPointAboveOrOnLevel', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointBelowLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking
        this._httpRequest('get', '/bbl/isPointBelowLevel', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointBelowOrOnLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._httpRequest('get', '/bbl/isPointBelowOrOnLevel', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointOnGroundLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._httpRequest('get', '/bbl/isPointOnGroundLevel', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointAboveGround(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._httpRequest('get', '/bbl/isPointAboveGround', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  isPointUnderGround(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._httpRequest('get', '/bbl/isPointUnderGround', bblOptions, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  getAssets(filter) {
    return new Promise((resolve, reject) => {
      try {
        this._httpRequest('get', '/asset', filter, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      }
    });
  },

  /**
   * Retrieve id of asset with specified measurement code and tags
   * @param {string} measurementCode
   * @param {object} assetTag
   */
  getAssetIdFromTag(measurementCode, assetTag) {
    return new Promise((resolve, reject) => {
      try {
        let options = {
          measurement_code: measurementCode,
          asset_tag: assetTag
        };

        this._httpRequest('get', '/asset', options, function(res) {
          if (res.success === true) {
            let assets = res.assets; // Expect an array of assets
            if (Array.isArray(assets) && assets.length === 1) {
              resolve({
                success: true,
                asset_id: assets[0].asset_id
              })
            } else {
              // Duplicate assets treated as not found
              resolve({
                success: false,
                errmsg: 'Asset not found',
                errcode: 'not_found'
              })
            }
          } else if (res.success === false && res.errcode === 'not_found') {
            resolve({
              success: false,
              errmsg: 'Asset not found',
              errcode: 'not_found'
            });
          } else {
            resolve(res);
          }
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'exception'
        });
      }
    });
  },

  /**
   * Retrieve attribute value of a specified asset (id, or measurement code and tags) and attribute name, with optional locale
   * @param {object} assetParam
   * @param {string} attributeName
   * @param {string} [locale]
   */
  getAttributeValue(assetParam, attributeName, locale) {
    return new Promise((resolve, reject) => {
      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['id', 'measurement_code', 'asset_tag'];
      const values = Object.keys(assetParam).filter(
        (value) => !ALLOWED_ATTRIBUTE_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }
      // Note: Let API handle type checking

      if (typeof attributeName !== 'string') {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

      let options = {
        asset_param: assetParam,
        attributeName: attributeName
      };

      // Add locale only if defined
      if (typeof locale === 'string') {
        options.locale = locale;
      }

      try {
        this._httpRequest('get', '/asset/attribute', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'exception'
        });
      }
    });
  },

  /**
   * Publishes measurement to http ingestor
   * @param {string} measurementCode
   * @param {Array.<object>} data
   * @param {string} type - 'live' | 'backlog'
   */
  publishMeasurement(measurementCode, data, type) {
    return new Promise((resolve, reject) => {
      try {
        const url = `https://${this._getApiField('host')}:${this._getApiField('port')}/ingestor/2/0/${type}/array/${this._getApiField('key')}/${measurementCode}`;

        console.log(url);

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
          resolve(response.data);
        })
        .catch((error) => {
          // Check if it is Senfi API returning 400, 404 or 500s
          if (error.response && error.response.data && typeof error.response.data.success === 'boolean') {
            resolve(error.response.data);
          // Check for 401 unauthorized
          } else if (error.response && error.response.status === 401) {
            resolve({
              success: false,
              errcode: 'unauthorized',
              errmsg: 'Unauthorized'
            });
          // For everything else
          } else {
            reject({
              success: false,
              errcode: 'sdk_exception',
              errmsg: error.message
            });
          }
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'exception'
        });
      }
    });
  },

  generateEvent(eventParams) {

  },

  /**
   * Send email notification via Senfi
   * @param {Array.<string>} to
   * @param {string} title
   * @param {string} content
   */
  doEmailAction(to, title, content) {
    return new Promise((resolve, reject) => {
      let options = {
        to: to,
        title: title,
        content: content,
      };
      // Note: Let API handle type checking

      try {
        this._httpRequest('post', '/action/email', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'exception'
        });
      }
    });
  },

  /**
   * Send sms notification via Senfi
   * @param {Array.<string>} to
   * @param {string} content
   */
  doSmsAction(to, content) {
    return new Promise((resolve, reject) => {
      let options = {
        to: to,
        content: content,
      };
      // Note: Let API handle type checking

      try {
        this._httpRequest('post', '/action/sms', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'exception'
        });
      }
    });
  },

  /**
   * Send telegram notification via Senfi
   * @param {Array.<string>} to
   * @param {string} content
   */
  doTelegramAction(to, content) {
    return new Promise((resolve, reject) => {
      let options = {
        to: to,
        content: content,
      };
      // Note: Let API handle type checking

      try {
        this._httpRequest('post', '/action/telegram', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'exception'
        });
      }
    });
  },

  /**
   * Send webhook notification via Senfi
   * @param {Array.<string>} to
   * @param {string} content
   * @param {string} webhookMethod - 'get' | 'post' | 'put'
   * @param {object} webhookHeader - e.g. Authentication headers
   */
  doWebhookAction(to, content, webhookMethod, webhookHeader) {
    return new Promise((resolve, reject) => {
      let options = {
        to: to,
        content: content,
        webhook_method: webhookMethod,
        webhook_header: webhookHeader
      };
      // Note: Let API handle type checking

      try {
        this._httpRequest('post', '/action/webhook', options, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'exception'
        });
      }
    });
  },

  sendCommandRequest() {

  },

  acknowledgeCommand() {

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
  _httpRequest(method, path, body, callback) {
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
  _ingestorRequest() {

  }
};

module.exports = Senfi;

// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Senfi = Senfi;

// Allow use with the TypeScript compiler without `esModuleInterop`.
// We may also want to add `Object.defineProperty(exports, "__esModule", {value: true});` in the future, so that Babel users will use the `default` version.
module.exports.default = Senfi;
