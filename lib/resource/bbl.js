'use strict';

function Bbl(senfi) {
  this._senfi = senfi;
}

Bbl.prototype = {

  /**
   * @deprecated
   * @param {integer} siteId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {string} buildingBblId
   */
  isPointInBuilding(siteId, posX, posY, posZ, buildingBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest_1_0('get', '/bbl/isPointInBuilding', bblOptions, function(res) {
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
   * @deprecated
   * @param {integer} siteId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {string} buildingBblId
   * @param {string} blockBblId
   */
  isPointInBlock(siteId, posX, posY, posZ, buildingBblId, blockBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest_1_0('get', '/bbl/isPointInBlock', bblOptions, function(res) {
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
   * @deprecated
   * @param {integer} siteId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {string} buildingBblId
   * @param {string} blockBblId
   * @param {string} levelBblId
   */
  isPointOnLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest_1_0('get', '/bbl/isPointOnLevel', bblOptions, function(res) {
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
   * @deprecated
   * @param {integer} siteId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {string} buildingBblId
   * @param {string} blockBblId
   * @param {string} levelBblId
   */
  isPointAboveLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest_1_0('get', '/bbl/isPointAboveLevel', bblOptions, function(res) {
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
   * @deprecated
   * @param {integer} siteId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {string} buildingBblId
   * @param {string} blockBblId
   * @param {string} levelBblId
   */
  isPointAboveOrOnLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking
        this._senfi.httpRequest_1_0('get', '/bbl/isPointAboveOrOnLevel', bblOptions, function(res) {
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
   * @deprecated
   * @param {integer} siteId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {string} buildingBblId
   * @param {string} blockBblId
   * @param {string} levelBblId
   */
  isPointBelowLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking
        this._senfi.httpRequest_1_0('get', '/bbl/isPointBelowLevel', bblOptions, function(res) {
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
   * @deprecated
   * @param {integer} siteId
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {string} buildingBblId
   * @param {string} blockBblId
   * @param {string} levelBblId
   */
  isPointBelowOrOnLevel(siteId, posX, posY, posZ, buildingBblId, blockBblId, levelBblId) {
    return new Promise((resolve, reject) => {
      try {
        let bblOptions = {
          site_id: siteId,
          pos_x: posX,
          pos_y: posY,
          pos_z: posZ,
          building_bbl_id: buildingBblId,
          block_bbl_id: blockBblId,
          level_bbl_id: levelBblId
        };
        // Note: Let API handle type checking

        this._senfi.httpRequest_1_0('get', '/bbl/isPointBelowOrOnLevel', bblOptions, function(res) {
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

module.exports = Bbl;
