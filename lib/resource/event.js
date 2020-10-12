'use strict';

function Event(senfi) {
  this._senfi = senfi;
}

Event.prototype = {

  subscribe(subscriptionOptions) {
    return new Promise((resolve, reject) => {
      // Check for any unexpected values
      const ALLOWED_SUB_PROPERTIES = ['event_def_id', 'site_id', 'asset_id', 'tag', 'event_source'];
      const values = Object.keys(subscriptionOptions).filter(
        (value) => !ALLOWED_SUB_PROPERTIES.includes(value)
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

      let options = subscriptionOptions;
      if (subscriptionOptions === null || subscriptionOptions === undefined) {
        options = {};
      }

      try {
        this._senfi.httpRequest('post', '/event/subscribe', options, function(res) {
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

  unsubscribe(token) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof token !== 'string') {
          reject({
            success: false,
            errmsg: 'Invalid arguments',
            errcode: 'invalid_argument'
          });
          return;
        }

        this._senfi.httpRequest('post', '/event/unsubscribe', {
          token: token
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
   * @param {number} eventDefId
   * @param {string} type - "measurement" | "event" | "alarm" | "command" | "log" | "unspecified"
   * @param {object} embeddedInputs
   * @param {object} eventParams
   * @param {Array.<object>} [eventParams.metric_caused] - For measurement type
   * @param {Array.<object>} [eventParams.measurement_snapshot] - For measurement type
   * @param {Array.<object>} [eventParams.event_data] - For event type
   * @param {Array.<object>} [eventParams.alarm_data] - For alarm type
   * @param {Array.<object>} [eventParams.command_data] - For command type
   * @param {Array.<object>} [eventParams.log_data] - For log type
   */
  generate(eventDefId, type, embeddedInputs, eventParams) {
    return new Promise((resolve, reject) => {
      if (typeof eventDefId !== 'number' && (typeof embeddedInputs !== 'object' && embeddedInputs !== null)) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
      }

      let options;

      switch (type) {
        case 'measurement': {
          // Check for any unexpected values
          const ALLOWED_ATTRIBUTE_PROPERTIES = ['metric_caused', 'measurement_snapshot'];
          const values = Object.keys(eventParams).filter(
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

          // Simple sanity check
          if (!Array.isArray(eventParams.metric_caused) || !Array.isArray(eventParams.measurement_snapshot)) {
            reject({
              success: false,
              errmsg: 'Invalid arguments',
              errcode: 'invalid_argument'
            })
            return;
          }

          options = {
            event_def_id: eventDefId,
            type: type,
            embedded_inputs: embeddedInputs,
            metric_caused: eventParams.metric_caused,
            measurement_snapshot: eventParams.measurement_snapshot
          };
        }
        break;
        case 'event': {
          // Check for any unexpected values
          const ALLOWED_ATTRIBUTE_PROPERTIES = ['event_data'];
          const values = Object.keys(eventParams).filter(
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

          // Simple sanity check
          if (!Array.isArray(eventParams.event_data)) {
            reject({
              success: false,
              errmsg: 'Invalid arguments',
              errcode: 'invalid_argument'
            })
            return;
          }

          options = {
            event_def_id: eventDefId,
            type: type,
            embedded_inputs: embeddedInputs,
            event_data: eventParams.event_data
          };
        }
        break;
        case 'alarm': {
          // Check for any unexpected values
          const ALLOWED_ATTRIBUTE_PROPERTIES = ['alarm_data'];
          const values = Object.keys(eventParams).filter(
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

          // Simple sanity check
          if (!Array.isArray(eventParams.alarm_data)) {
            reject({
              success: false,
              errmsg: 'Invalid arguments',
              errcode: 'invalid_argument'
            })
            return;
          }

          options = {
            event_def_id: eventDefId,
            type: type,
            embedded_inputs: embeddedInputs,
            event_data: eventParams.event_data
          };
        }
        break;
        case 'command':
          // Check for any unexpected values
          const ALLOWED_ATTRIBUTE_PROPERTIES = ['command_data'];
          const values = Object.keys(eventParams).filter(
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

          // Simple sanity check
          if (!Array.isArray(eventParams.command_data)) {
            reject({
              success: false,
              errmsg: 'Invalid arguments',
              errcode: 'invalid_argument'
            })
            return;
          }

          options = {
            event_def_id: eventDefId,
            type: type,
            embedded_inputs: embeddedInputs,
            event_data: eventParams.event_data
          };
        break;
        case 'log': {
          // Check for any unexpected values
          const ALLOWED_ATTRIBUTE_PROPERTIES = ['log_data'];
          const values = Object.keys(eventParams).filter(
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

          // Simple sanity check
          if (!Array.isArray(eventParams.log_data)) {
            reject({
              success: false,
              errmsg: 'Invalid arguments',
              errcode: 'invalid_argument'
            })
            return;
          }

          options = {
            event_def_id: eventDefId,
            type: type,
            embedded_inputs: embeddedInputs,
            event_data: eventParams.event_data
          };
        }
        break;
        case 'unspecified': {
          options = {
            event_def_id: eventDefId,
            type: type,
            embedded_inputs: embeddedInputs
          };
        }
        break;

        default: {
          reject({
            success: false,
            errmsg: 'Invalid arguments',
            errcode: 'invalid_argument'
          });
          return;
        }
      }

      try {
        this._senfi.httpRequest('post', '/event', options, function(res) {
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

module.exports = Event;