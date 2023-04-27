'use strict';

function EventDefinition(senfi) {
  this._senfi = senfi;
}

EventDefinition.prototype = {

  /**
   * @typedef {object} EventDefResponse
   * @param {boolean} success
   * @param {object[]} [event_defs]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Retrieve list of event definitions for by organization, event_def_id or type
   * @param {object} eventDefParam
   * @param {Array.<integer>|integer} [eventDefParam.event_def_id]
   * @param {string} [eventDefParam.type] - "user_defined" or "external"
   * @param {string} [eventDefParam.connector_id]
   * @param {string} [eventDefParam.instance_id]
   * @return {Promise<EventDefResponse>}
   */
   get(eventDefParam) {
    return new Promise((resolve, reject) => {
      if (typeof eventDefParam !== 'object' || eventDefParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['event_def_id', 'type', 'connector_id', 'instance_id'];
      const values = Object.keys(eventDefParam).filter(
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
        this._senfi.httpRequest('get', '/eventdef', eventDefParam, function(res) {
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
   * @typedef {object} EventDefIdResponse
   * @param {boolean} success
   * @param {integer} [event_def_id]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Create an external event definition
   * @param {object} eventDefParam
   * @param {string} eventDefParam.name
   * @param {string} eventDefParam.description
   * @param {Array.<string>} eventDefParam.required_tagfield
   * @param {Array.<string>} eventDefParam.input
   * @param {string} eventDefParam.connector_id
   * @param {string} eventDefParam.instance_id
  *  @return {Promise<EventDefIdResponse>}
   */
  create(eventDefParam) {
    return new Promise((resolve, reject) => {
      if (typeof eventDefParam !== 'object' || eventDefParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['name', 'description', 'required_tagfield', 'input', 'connector_id', 'instance_id'];
      const values = Object.keys(eventDefParam).filter(
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

      // Simple sanity check
      if (typeof eventDefParam.name !== 'string' || typeof eventDefParam.description !== 'string' ||
          !Array.isArray(eventDefParam.required_tagfield) || !Array.isArray(eventDefParam.input)) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. "name" and "description" should be strings.',
          errcode: 'invalid_argument'
        })
        return;
      }

      try {
        this._senfi.httpRequest('post', '/eventdef', eventDefParam, function(res) {
          resolve(res);
        });
      } catch (ex) {
        reject({
          success: false,
          errmsg: ex.message,
          errcode: 'sdk_exception'
        });
      };
    });
  },

  /**
   * @typedef {object} GenericResponse
   * @param {boolean} success
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * Update an external event definition
   * @param {integer} eventDefId
   * @param {object} eventDefParam
   * @param {string} eventDefParam.name
   * @param {string} eventDefParam.description
   * @param {Array.<string>} eventDefParam.required_tagfield
   * @param {Array.<string>} eventDefParam.input
   * @param {string} eventDefParam.connector_id
   * @param {string} eventDefParam.instance_id
   * @return {Promise<GenericResponse>}
   */
  update(eventDefId, eventDefParam) {
    return new Promise((resolve, reject) => {
      if (typeof eventDefId !== 'number') {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Integer expected for first argument.',
          errcode: 'invalid_argument'
        });
        return;
      }

      if (typeof eventDefParam !== 'object' || eventDefParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected for second argument.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['event_def_id', 'name', 'description', 'required_tagfield', 'input', 'connector_id', 'instance_id'];
      const values = Object.keys(eventDefParam).filter(
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
        this._senfi.httpRequest('put', `/eventdef/${eventDefId}`, eventDefParam, function(res) {
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
   * Delete an external event definition
   * @param {integer} eventDefId
   * @param {object} eventDefParam
   * @param {string} eventDefParam.connector_id
   * @param {string} eventDefParam.instance_id
   * @return {Promise<GenericResponse>}
   */
   delete(eventDefId, eventDefParam) {
    return new Promise((resolve, reject) => {
      if (typeof eventDefId !== 'number') {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Integer expected for first argument.',
          errcode: 'invalid_argument'
        });
        return;
      }

      if (typeof eventDefParam !== 'object' || eventDefParam === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments. Object expected for second argument.',
          errcode: 'invalid_argument'
        })
        return;
      }

      // Check for any unexpected values
      const ALLOWED_ATTRIBUTE_PROPERTIES = ['connector_id', 'instance_id'];
      const values = Object.keys(eventDefParam).filter(
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

      try {
        this._senfi.httpRequest('delete', `/eventdef/${eventDefId}`, eventDefParam, function(res) {
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

module.exports = EventDefinition;
