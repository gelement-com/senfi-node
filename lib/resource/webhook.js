'use strict';

function Webhook(senfi) {
  this._senfi = senfi;
}

Webhook.prototype = {

  /**
   * @typedef {object} GenericResponse
   * @param {boolean} success
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Set webhook to receive subscribed data. Overrides existing webhook. Unset an existing webhook by setting null.
   * @param {string|null} url - Fully qualified URL of the webhook to be set; Null to unset webhook.
   * @return {Promise<GenericResponse>}
   */
  set(url) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof url !== 'string' && url !== null) {
          reject({
            success: false,
            errmsg: 'Invalid arguments',
            errcode: 'invalid_argument'
          });
          return;
        }

        this._senfi.httpRequest('put', '/webhook', {
          webhook: url
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
   * @typedef {object} WebhookResponse
   * @param {boolean} success
   * @param {string} [webhook]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Gets existing webhook, if one has been set previously
   * @return {Promise<WebhookResponse>}
   */
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
