'use strict';

function Asset(senfi) {
  this._senfi = senfi;
}

Asset.prototype = {

  /**
   * Retrieve list of assets by organization, site_id, asset_id or tag
   * @param {object} assetParam
   * @param {Array.<integer>|integer} [assetParam.site_id]
   * @param {Array.<integer>|integer} [assetParam.asset_id]
   * @param {object|Array.<object>} [assetParam.tag] - Event with related assets by measurement code and tag [{ measurement_code: value,  tag: { tag1: value, tag2: value, … }}]
   */
  get(assetParam) {
    return new Promise((resolve, reject) => {
      if (typeof assetParam !== 'object' || assetParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['site_id', 'asset_id', 'tag'];
      const values = Object.keys(assetParam).filter(
        (value) => !ALLOWED_ATTRIBUTE_PROPERTIES.includes(value)
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

      try {
        this._senfi.httpRequest('get', '/asset', assetParam, function(res) {
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
   * Retrieve id of asset with specified measurement code and tags
   * @param {string} measurementCode
   * @param {object} tag
   */
  getAssetIdFromTag(measurementCode, tag) {
    return new Promise((resolve, reject) => {
      try {
        let options = {
          measurement_code: measurementCode,
          tag: tag
        };

        this._senfi.httpRequest('get', '/asset', options, function(res) {
          if (res.success === true) {
            let assets = res.assets; // Expect an array of assets
            if (Array.isArray(assets) && assets.length === 1) {
              resolve({
                success: true,
                asset_id: assets[0].asset_id
              })
            } else {
              // Duplicate assets treated as not found
              resolve({
                success: false,
                errmsg: 'Asset not found',
                errcode: 'not_found'
              })
            }
          } else if (res.success === false && res.errcode === 'not_found') {
            resolve({
              success: false,
              errmsg: 'Asset not found',
              errcode: 'not_found'
            });
          } else {
            resolve(res);
          }
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
   * Retrieve details of the specified assets (asset_id)
   * @param {object} assetParam
   * @param {Array.<integer>|integer} assetParam.asset_id
   */
  getDetail(assetParam) {
    return new Promise((resolve, reject) => {
      if (typeof assetParam !== 'object' || assetParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['asset_id'];
      const values = Object.keys(assetParam).filter(
        (value) => !ALLOWED_ATTRIBUTE_PROPERTIES.includes(value)
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

      try {
        this._senfi.httpRequest('get', '/asset/detail', assetParam, function(res) {
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
   * Retrieve attribute value of a specified asset (id, or measurement code and tags) and attribute name, with optional locale
   * @param {object} assetParam
   * @param {string} attributeName
   * @param {string} [locale]
   */
  getAttributeValue(assetParam, attributeName, locale) {
    return new Promise((resolve, reject) => {
      if (typeof assetParam !== 'object' || assetParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['asset_id', 'measurement_code', 'tag'];
      const values = Object.keys(assetParam).filter(
        (value) => !ALLOWED_ATTRIBUTE_PROPERTIES.includes(value)
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

      if (typeof attributeName !== 'string') {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

      let options = assetParam;
      if (options === null || options === undefined) {
        options = {};
      }
      options.attribute_name = attributeName

      // Add locale only if defined
      if (typeof locale === 'string') {
        options.locale = locale;
      }

      try {
        this._senfi.httpRequest('get', '/asset/attribute', options, function(res) {
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

module.exports = Asset;
