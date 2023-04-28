'use strict';

function Measurement(senfi) {
  this._senfi = senfi;
}

Measurement.prototype = {

  /**
   * @typedef {object} MeasurementResponse
   * @param {boolean} success
   * @param {object[]} [measurements]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Retrieve list of measurements by organization, asset_id or measurement code
   * @param {object} measurementParam
   * @param {integer|Array.<integer>} [measurementParam.asset_id]
   * @param {string|Array.<string>} [measurementParam.measurement_code]
   * @return {Promise<MeasurementResponse>}
   */
   get(measurementParam) {
    return new Promise((resolve, reject) => {
      if (typeof measurementParam !== 'object' || measurementParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['asset_id', 'measurement_code'];
      const values = Object.keys(measurementParam).filter(
        (value) => !ALLOWED_ATTRIBUTE_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Unexpected properties in object: ' + values.join(', '),
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
   * Retrieve details of the specified measurements by measurement code
   * @param {object} measurementParam
   * @param {Array.<integer>|integer} measurementParam.measurement_code
   * @return {Promise<MeasurementResponse>}
   */
  getDetail(measurementParam) {
    return new Promise((resolve, reject) => {
      if (typeof measurementParam !== 'object' || measurementParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['measurement_code'];
      const values = Object.keys(measurementParam).filter(
        (value) => !ALLOWED_ATTRIBUTE_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Unexpected properties in object: ' + values.join(', '),
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
   * @typedef {object} MetricResponse
   * @param {boolean} success
   * @param {object[]} [metrics]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Retrieve metrics of the specified measurements by measurement code
   * @param {object} measurementParam
   * @param {Array.<integer>|integer} measurementParam.measurement_code
   * @return {Promise<MetricResponse>}
   */
  getMetric(measurementParam) {
    return new Promise((resolve, reject) => {
      if (typeof measurementParam !== 'object' || measurementParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['measurement_code'];
      const values = Object.keys(measurementParam).filter(
        (value) => !ALLOWED_ATTRIBUTE_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Unexpected properties in object: ' + values.join(', '),
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
   * @typedef {object[]} MeasurementData
   * @param {boolean} success
   */
  /**
   * @typedef {object} GenericResponse
   * @param {boolean} success
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Retrieve data of the specified measurements by measurement code
   * @param {object} measurementParam
   * @param {Array.<integer>|integer} measurementParam.measurement_code
   * @param {Array.<integer>|integer} [measurementParam.asset_id]
   * @param {Array.<object>|object} [measurementParam.tag]
   * @param {Array.<string>} [measurementParam.metrics]
   * @param {integer} [measurementParam.limit]
   * @param {integer} [measurementParam.tm_start]
   * @param {integer} [measurementParam.tm_end]
   * @param {string} measurementParam.format
   * @param {string} [measurementParam.encoding]
   * @return {Promise<MeasurementData|GenericResponse>}
   */
  getData(measurementParam) {
    return new Promise((resolve, reject) => {
      if (typeof measurementParam !== 'object' || measurementParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['measurement_code', 'asset_id', 'tag', 'metrics', 'limit', 'tm_start', 'tm_end', 'format', 'encoding'];
      const values = Object.keys(measurementParam).filter(
        (value) => !ALLOWED_ATTRIBUTE_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Unexpected properties in object: ' + values.join(', '),
          errcode: 'invalid_argument'
        })
        return;
      }
      // Note: Let API handle type checking

      try {
        this._senfi.httpRequest('get', '/measurement/data', measurementParam, function(res) {
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
   * @typedef {object} SubscriptionResponse
   * @param {boolean} success
   * @param {string} [token]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * @param {object} subscriptionOptions
   * @param {string|Array.<string>} [subscriptionOptions.measurement_code]
   * @return {Promise<SubscriptionResponse>}
   */
  subscribe(subscriptionOptions) {
    return new Promise((resolve, reject) => {
      if (typeof subscriptionOptions !== 'object' || subscriptionOptions === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
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
          errmsg: 'Invalid arguments. Unexpected properties in object: ' + values.join(', '),
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
   * @return {Promise<GenericResponse>}
   */
  unsubscribe(token) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof token !== 'string') {
          reject({
            success: false,
            errmsg: 'Invalid arguments. String expected.',
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
   * @return {Promise<GenericResponse>}
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
