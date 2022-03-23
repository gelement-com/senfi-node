'use strict';

function Zone(senfi) {
  this._senfi = senfi;
}

Zone.prototype = {

  /**
   * @typedef {object} ZoneBooleanResponse
   * @param {boolean} success
   * @param {boolean} [zone_result]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * @param {integer} zoneId
   * @param {integer} assetId
   * @return {Promise<ZoneBooleanResponse>}
   */
  isAssetInZone(zoneId, assetId) {
    return new Promise((resolve, reject) => {
      try {
        let zoneOptions = {
          zone_id: zoneId,
          asset_id: assetId
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest('get', '/zone/isAssetInZone', zoneOptions, function(res) {
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
   * @param {integer} zoneId
   * @param {integer} assetId
   * @return {Promise<ZoneBooleanResponse>}
   */
  isAssetAboveZone(zoneId, assetId) {
    return new Promise((resolve, reject) => {
      try {
        let zoneOptions = {
          zone_id: zoneId,
          asset_id: assetId
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest('get', '/zone/isAssetAboveZone', zoneOptions, function(res) {
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
   * @param {integer} zoneId
   * @param {integer} assetId
   * @return {Promise<ZoneBooleanResponse>}
   */
  isAssetBelowZone(zoneId, assetId) {
    return new Promise((resolve, reject) => {
      try {
        let zoneOptions = {
          zone_id: zoneId,
          asset_id: assetId
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest('get', '/zone/isAssetBelowZone', zoneOptions, function(res) {
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
   * @param {integer} zoneId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @return {Promise<ZoneBooleanResponse>}
   */
   isPointInZone(zoneId, posX, posY, posZ) {
    return new Promise((resolve, reject) => {
      try {
        let zoneOptions = {
          zone_id: zoneId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest('get', '/zone/isPointInZone', zoneOptions, function(res) {
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
   * @param {integer} zoneId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @return {Promise<ZoneBooleanResponse>}
   */
   isPointAboveZone(zoneId, posX, posY, posZ) {
    return new Promise((resolve, reject) => {
      try {
        let zoneOptions = {
          zone_id: zoneId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ
        };
        // Note: Let API handle type checking
        this._senfi.httpRequest('get', '/zone/isPointAboveZone', zoneOptions, function(res) {
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
   * @param {integer} zoneId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @return {Promise<ZoneBooleanResponse>}
   */
  isPointBelowZone(zoneId, posX, posY, posZ) {
    return new Promise((resolve, reject) => {
      try {
        let zoneOptions = {
          zone_id: zoneId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ
        };
        // Note: Let API handle type checking
        this._senfi.httpRequest('get', '/zone/isPointBelowZone', zoneOptions, function(res) {
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
   * @typedef {object} ZoneArrayResponse
   * @param {boolean} success
   * @param {integer[]} [zone_result]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * @param {integer} assetId
   * @return {Promise<ZoneArrayResponse>}
   */
  getZoneIdsFromAsset(assetId) {
    return new Promise((resolve, reject) => {
      try {
        let zoneOptions = {
          asset_id: assetId
        };
        // Note: Let API handle type checking
        this._senfi.httpRequest('get', '/zone/getZoneIdsFromAsset', zoneOptions, function(res) {
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
   * @param {integer} siteId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @return {Promise<ZoneArrayResponse>}
   */
   getZoneIdsFromPoint(siteId, posX, posY, posZ) {
    return new Promise((resolve, reject) => {
      try {
        let zoneOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ
        };
        // Note: Let API handle type checking
        this._senfi.httpRequest('get', '/zone/getZoneIdsFromPoint', zoneOptions, function(res) {
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

module.exports = Zone;
