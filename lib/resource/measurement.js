'use strict';

function Measurement(senfi) {
  this._senfi = senfi;
}

Measurement.prototype = {


  /**
   * Retrieve list of measurements by organization, asset_id, code or measurement_id
   * @param {object} measurementParam
   * @param {integer|Array.<integer>} [measurementParam.asset_id]
   * @param {string|Array.<string>} [measurementParam.code]
   * @param {integer|Array.<integer>} [measurementParam.measurement_id]
   */
   get(measurementParam) {
    return new Promise((resolve, reject) => {
      if (typeof measurementParam !== 'object' || measurementParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['asset_id', 'code', 'measurement_id'];
      const values = Object.keys(measurementParam).filter(
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


      try {
        this._senfi.httpRequest('get', '/measurement', measurementParam, function(res) {
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
   * Retrieve details of the specified measurements by measurement_id
   * @param {object} measurementParam
   * @param {Array.<integer>|integer} measurementParam.measurement_id
   */
  getDetail(measurementParam) {
    return new Promise((resolve, reject) => {
      if (typeof measurementParam !== 'object' || measurementParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['measurement_id'];
      const values = Object.keys(measurementParam).filter(
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

      try {
        this._senfi.httpRequest('get', '/measurement/detail', measurementParam, function(res) {
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
   * Retrieve metrics of the specified measurements by measurement_id
   * @param {object} measurementParam
   * @param {Array.<integer>|integer} measurementParam.measurement_id
   */
  getMetric(measurementParam) {
    return new Promise((resolve, reject) => {
      if (typeof measurementParam !== 'object' || measurementParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['measurement_id'];
      const values = Object.keys(measurementParam).filter(
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

      try {
        this._senfi.httpRequest('get', '/measurement/metric', measurementParam, function(res) {
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
   * @param {object} subscriptionOptions
   * @param {string|Array.<string>} [subscriptionOptions.measurement_code]
   */
  subscribe(subscriptionOptions) {
    return new Promise((resolve, reject) => {
      if (typeof subscriptionOptions !== 'object' || subscriptionOptions === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

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
        this._senfi.httpRequest('post', '/measurement/subscribe', options, function(res) {
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
   * @param {string} token
   */
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

        this._senfi.httpRequest('post', '/measurement/unsubscribe', {
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

  /**
   * Publishes measurement to http ingestor
   * @param {string} measurementCode
   * @param {Array.<object>} data
   * @param {string} type - 'live' | 'backlog'
   */
  publish(measurementCode, data, type) {
    return new Promise((resolve, reject) => {
      try {
        this._senfi.httpRequest('post', '/measurement', {
          measurement_code: measurementCode,
          type: type,
          data: data
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
}

module.exports = Measurement;
