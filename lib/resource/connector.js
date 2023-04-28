'use strict';

function Connector(senfi) {
  this._senfi = senfi;
}

Connector.prototype = {

  /**
   * @typedef {object} ConnectorRegisterResponse
   * @param {boolean} success
   * @param {string} [connector_id]
   * @param {string} [instance_id]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Registers a new connector
   * @param {object} connectorParam
   * @param {string} connectorParam.name
   * @param {string} [connectorParam.description]
   * @return {Promise<ConnectorRegisterResponse>}
   */
  register(connectorParam) {
    return new Promise((resolve, reject) => {
      if (typeof connectorParam !== 'object' || connectorParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['name', 'description'];
      const values = Object.keys(connectorParam).filter(
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
        this._senfi.httpRequest('post', '/connector', connectorParam, function(res) {
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
   * Re-register a connector
   * @param {string} connectorId
   * @param {object} connectorParam
   * @param {string} connectorParam.name
   * @param {string} [connectorParam.description]
   * @return {Promise<ConnectorRegisterResponse>}
   */
  reregister(connectorId, connectorParam) {
    return new Promise((resolve, reject) => {
      if (typeof connectorId !== 'string') {
        reject({
          success: false,
          errmsg: 'Invalid arguments. String expected for first argument.',
          errcode: 'invalid_argument'
        });
        return;
      }

      if (typeof connectorParam !== 'object' || connectorParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected for second argument.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['name', 'description'];
      const values = Object.keys(connectorParam).filter(
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
        this._senfi.httpRequest('post', `/connector/${connectorId}`, connectorParam, function(res) {
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
   * Update a connector
   * @param {string} connectorId
   * @param {object} connectorParam
   * @param {string} connectorParam.name
   * @param {string} [connectorParam.description]
   * @param {string} [connectorParam.instance_id]
   * @return {Promise<GenericResponse>}
   */
  update(connectorId, connectorParam) {
    return new Promise((resolve, reject) => {
      if (typeof connectorId !== 'string') {
        reject({
          success: false,
          errmsg: 'Invalid arguments. String expected for first argument.',
          errcode: 'invalid_argument'
        });
        return;
      }

      if (typeof connectorParam !== 'object' || connectorParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected for second argument.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['name', 'description', 'instance_id'];
      const values = Object.keys(connectorParam).filter(
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
        this._senfi.httpRequest('put', `/connector/${connectorId}`, connectorParam, function(res) {
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
   * Unregister a connector
   * @param {string} connectorId
   * @param {object} connectorParam
   * @param {string} [connectorParam.instance_id]
   * @return {Promise<GenericResponse>}
   */
   unregister(connectorId, connectorParam) {
    return new Promise((resolve, reject) => {
      if (typeof connectorId !== 'string') {
        reject({
          success: false,
          errmsg: 'Invalid arguments. String expected for first argument.',
          errcode: 'invalid_argument'
        });
        return;
      }

      if (typeof connectorParam !== 'object' || connectorParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected for second argument.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['instance_id'];
      const values = Object.keys(connectorParam).filter(
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
        this._senfi.httpRequest('delete', `/connector/${connectorId}`, connectorParam, function(res) {
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
   * Send a keep-alive ping to Senfi
   * @param {string} connectorId
   * @param {object} connectorParam
   * @param {string} [connectorParam.instance_id]
   * @return {Promise<GenericResponse>}
   */
  ping(connectorId, connectorParam) {
    return new Promise((resolve, reject) => {
      if (typeof connectorId !== 'string') {
        reject({
          success: false,
          errmsg: 'Invalid arguments. String expected for first argument.',
          errcode: 'invalid_argument'
        });
        return;
      }

      if (typeof connectorParam !== 'object' || connectorParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected for second argument.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['instance_id'];
      const values = Object.keys(connectorParam).filter(
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
        this._senfi.httpRequest('post', `/connector/${connectorId}/ping`, connectorParam, function(res) {
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

module.exports = Connector;
