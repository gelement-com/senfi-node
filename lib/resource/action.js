'use strict';

function Action(senfi) {
  this._senfi = senfi;
}

Action.prototype = {

  /**
   * @typedef {object} GenericResponse
   * @param {boolean} success
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Send email notification via Senfi
   * @param {Array.<string>} to
   * @param {string} title
   * @param {string} content
   * @return {Promise<GenericResponse>}
   */
  email(to, title, content) {
    return new Promise((resolve, reject) => {
      let options = {
        to: to,
        title: title,
        content: content,
      };
      // Note: Let API handle type checking

      try {
        this._senfi.httpRequest('post', '/action/email', options, function(res) {
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
   * @return {Promise<GenericResponse>}
   */
  sms(to, content) {
    return new Promise((resolve, reject) => {
      let options = {
        to: to,
        content: content,
      };
      // Note: Let API handle type checking

      try {
        this._senfi.httpRequest('post', '/action/sms', options, function(res) {
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
   * @return {Promise<GenericResponse>}
   */
  telegram(to, content) {
    return new Promise((resolve, reject) => {
      let options = {
        to: to,
        content: content,
      };
      // Note: Let API handle type checking

      try {
        this._senfi.httpRequest('post', '/action/telegram', options, function(res) {
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
   * @return {Promise<GenericResponse>}
   */
  webhook(to, content, webhookMethod, webhookHeader) {
    return new Promise((resolve, reject) => {
      let options = {
        to: to,
        content: content,
        webhook_method: webhookMethod,
        webhook_header: webhookHeader
      };
      // Note: Let API handle type checking

      try {
        this._senfi.httpRequest('post', '/action/webhook', options, function(res) {
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

module.exports = Action;
