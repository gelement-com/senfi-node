'use strict';

function Command(senfi) {
  this._senfi = senfi;
}

Command.prototype = {

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
        this._senfi.httpRequest('post', '/command/subscribe', options, function(res) {
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
   * @typedef {object} GenericResponse
   * @param {boolean} success
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
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

        this._senfi.httpRequest('post', '/command/unsubscribe', {
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
   * @typedef {object} CommandRequestResponse
   * @param {boolean} success
   * @param {string} request_id
   * @param {object[]} [warn_messages]
   * @param {object} acknowledgement_data
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Send a command request to Senfi
   * @param {string} requestId
   * @param {string} measurementCode
   * @param {number} priority
   * @param {number|null} ttl
   * @param {number|null} timeout
   * @param {object} data
   * @return {Promise<CommandRequestResponse>}
   */
  request(requestId, measurementCode, priority, ttl, timeout, data) {
    return new Promise((resolve, reject) => {
      let options = {
        request_id: requestId,
        measurement_code: measurementCode,
        priority: priority,
        ttl: ttl,
        timeout: timeout,
        data: data
      };
      // Note: Let API handle type checking

      try {
        this._senfi.httpRequest('post', '/command/request', options, function(res) {
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
   * Send a command acknowledgement back to Senfi in response to an inform command subscription message
   * @param {string} messageId
   * @param {*} measurementCode
   * @param {*} data
   * @return {Promise<GenericResponse>}
   */
  acknowledge(messageId, measurementCode, data) {
    return new Promise((resolve, reject) => {
      let options = {
        message_id: messageId,
        measurement_code: measurementCode,
        data: data
      };
      // Note: Let API handle type checking

      try {
        this._senfi.httpRequest('post', '/command/acknowledge', options, function(res) {
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
}

module.exports = Command;
