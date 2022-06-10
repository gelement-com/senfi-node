'use strict';

function Alarm(senfi) {
  this._senfi = senfi;
}

Alarm.prototype = {

  /**
   * @typedef {object} SubscriptionResponse
   * @param {boolean} success
   * @param {string} [token]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * @param {object} subscriptionOptions
   * @param {integer|Array.<integer>} [subscriptionOptions.event_def_id] - Alarms raised by specific event
   * @param {integer|Array.<integer>} [subscriptionOptions.site_id] – Alarm with related asset in site
   * @param {integer|Array.<integer>} [subscriptionOptions.asset_id] – Alarms with related asset by asset id
   * @return {Promise<SubscriptionResponse>}
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
        this._senfi.httpRequest('post', '/alarm/subscribe', options, function(res) {
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
            errmsg: 'Invalid arguments',
            errcode: 'invalid_argument'
          });
          return;
        }

        this._senfi.httpRequest('post', '/alarm/unsubscribe', {
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

module.exports = Alarm;
