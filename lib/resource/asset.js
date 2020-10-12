'use strict';

function Asset(senfi) {
  this._senfi = senfi;
}

Asset.prototype = {

  get(filter) {
    return new Promise((resolve, reject) => {
      try {
        this._senfi.httpRequest('get', '/asset', filter, function(res) {
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
   * @param {object} assetTag
   */
  getAssetIdFromTag(measurementCode, assetTag) {
    return new Promise((resolve, reject) => {
      try {
        let options = {
          measurement_code: measurementCode,
          asset_tag: assetTag
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
   * Retrieve attribute value of a specified asset (id, or measurement code and tags) and attribute name, with optional locale
   * @param {object} assetParam
   * @param {string} attributeName
   * @param {string} [locale]
   */
  getAttributeValue(assetParam, attributeName, locale) {
    return new Promise((resolve, reject) => {
      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['id', 'measurement_code', 'asset_tag'];
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

      let options = {
        asset_param: assetParam,
        attributeName: attributeName
      };

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
