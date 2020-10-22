'use strict';

function Subscription(senfi) {
  this._senfi = senfi;
}

Subscription.prototype = {

  /**
   * @typedef {object} SubscriptionResponse
   * @param {boolean} success
   * @param {Array.<object>} [subscriptions]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Get the list of subscriptions subscribed to
   * @return {Promise<SubscriptionResponse>}
   */
  get() {
    return new Promise((resolve, reject) => {
      try {
        this._senfi.httpRequest('get', '/subscription', {}, function(res) {
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

module.exports = Subscription;
