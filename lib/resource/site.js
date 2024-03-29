'use strict';

function Site(senfi) {
  this._senfi = senfi;
}

Site.prototype = {

  /**
   * @typedef {object} SiteResponse
   * @param {boolean} success
   * @param {object[]} [sites]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Retrieve list of sites for the organization
   * @return {Promise<SiteResponse>}
   */
  get() {
    return new Promise((resolve, reject) => {
      try {
        this._senfi.httpRequest('get', '/site', null, function(res) {
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
   * Retrieve details of the specified sites by site_id
   * @param {object} siteParam
   * @param {Array.<integer>|integer} siteParam.site_id
   * @return {Promise<SiteResponse>}
   */
  getDetail(siteParam) {
    return new Promise((resolve, reject) => {
      if (typeof siteParam !== 'object' || siteParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['site_id'];
      const values = Object.keys(siteParam).filter(
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
        this._senfi.httpRequest('get', '/site/detail', siteParam, function(res) {
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

module.exports = Site;
