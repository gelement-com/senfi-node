'use strict';

function Event(senfi) {
  this._senfi = senfi;
}

Event.prototype = {

  /**
   * @typedef {object} SubscriptionResponse
   * @param {boolean} success
   * @param {string} [token]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * @param {object} subscriptionOptions
   * @param {integer|Array.<integer>} [subscriptionOptions.event_def_id] - Specific event
   * @param {integer|Array.<integer>} [subscriptionOptions.site_id] – Event with related asset in site
   * @param {integer|Array.<integer>} [subscriptionOptions.asset_id] – Event with related asset by asset id
   * @param {object|Array.<object>} [subscriptionOptions.tag] - Event with related assets by measurement code and tag [{ measurement_code: value,  tag: { tag1: value, tag2: value, … }}]
   * @param {string|Array.<string>} [subscriptionOptions.event_source] – "measurement", "external"
   * @return {Promise<SubscriptionResponse>}
   */
  subscribe(subscriptionOptions) {
    return new Promise((resolve, reject) => {
      if (typeof subscriptionOptions !== 'object' || subscriptionOptions === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        })
        return;
      }

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

  /**
   * @typedef {object} GenericResponse
   * @param {boolean} success
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * @param {string} token
   * @return {Promise<GenericResponse>}
   */
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
   * @typedef {object} EventGenerateResponse
   * @param {boolean} success
   * @param {string} [warn_message]
   * @param {string} [errmsg]
   * @param {string} [errcode]
   */
  /**
   * @param {number} eventDefId
   * @param {string} type - "measurement"
   * @param {object} inputs
   * @param {object} eventParams
   * @param {Array.<object>} [eventParams.metric_caused] - For measurement type
   * @param {Array.<object>} [eventParams.measurement_snapshot] - For measurement type
   * @return {Promise<EventGenerateResponse>}
   */
  generate(eventDefId, type, inputs, eventParams) {
    return new Promise((resolve, reject) => {
      if (typeof eventDefId !== 'number' || typeof inputs !== 'object' || inputs === null) {
        reject({
          success: false,
          errmsg: 'Invalid arguments',
          errcode: 'invalid_argument'
        });
        return;
      }

      let options;

      switch (type) {
        case 'measurement': {
          if (typeof eventParams !== 'object' || eventParams === null) {
            reject({
              success: false,
              errmsg: 'Invalid arguments',
              errcode: 'invalid_argument'
            })
            return;
          }

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
            input_json: inputs,
            metric_caused: eventParams.metric_caused,
            measurement_snapshot: eventParams.measurement_snapshot
          };
        }
        break;

        case 'external': {
          if (typeof eventParams !== 'object' || eventParams === null) {
            reject({
              success: false,
              errmsg: 'Invalid arguments',
              errcode: 'invalid_argument'
            })
            return;
          }

          // Check for any unexpected values
          const ALLOWED_ATTRIBUTE_PROPERTIES = ['tag_data'];
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
          if (!Array.isArray(eventParams.tag_data)) {
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
            input_json: inputs,
            tag_data: eventParams.tag_data
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
