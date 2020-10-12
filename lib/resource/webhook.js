'use strict';

function Webhook(senfi) {
  this._senfi = senfi;
}

Webhook.prototype = {

  set(url) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof url !== 'string' && typeof webhook !== null) {
          reject({
            success: false,
            errmsg: 'Invalid arguments',
            errcode: 'invalid_argument'
          });
          return;
        }

        this._senfi.httpRequest('put', '/webhook', {
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

  get() {
    return new Promise((resolve, reject) => {
      try {
        this._senfi.httpRequest('get', '/webhook', {}, function(res) {
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

module.exports = Webhook;
