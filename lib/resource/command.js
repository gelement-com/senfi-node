'use strict';

function Command(senfi) {
  this._senfi = senfi;
}

Command.prototype = {

  subscribe(subscriptionOptions) {
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
   * Send a command request to Senfi
   * @param {string} requestId
   * @param {string} measurementCode
   * @param {number} priority
   * @param {number|null} ttl
   * @param {number|null} timeout
   * @param {object} data
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
