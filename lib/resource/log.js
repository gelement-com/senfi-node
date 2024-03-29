'use strict';

function Log(senfi) {
  this._senfi = senfi;
}

Log.prototype = {

  /**
   * @typedef {object} SubscriptionResponse
   * @param {boolean} success
   * @param {string} [token]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * @param {object} subscriptionOptions
   * @param {string|Array.<string>} [subscriptionOptions.component] - Refer to component short name documentation
   * @param {string} [subscriptionOptions.severity] – Min severity - "error" | "warn" | "info" | "debug"
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
      const ALLOWED_SUB_PROPERTIES = ['component', 'severity'];
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
        this._senfi.httpRequest('post', '/log/subscribe', options, function(res) {
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

        this._senfi.httpRequest('post', '/log/unsubscribe', {
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
}

module.exports = Log;
