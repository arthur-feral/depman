'use strict';

/**
 * Singleton dispatcher used as a global bus event.
 */
const _            = require('lodash');
const EventEmitter = require('eventemitter2').EventEmitter2;
const dispatcher   = new EventEmitter();

// Default config only allow 10 listeners which is not compatible with our flux architecture
dispatcher.setMaxListeners(0);

/**
 * Register events to object
 * event object must must be in the following format:
 * {
 *   event: 'EventName',
 *   method: objectMethodAsString
 * }
 * @param {Array} events
 * @param {Object} object
 */
function registerEventsToObject(events, object) {
  _.forEach(events, (event) => {
    if (_.isUndefined(event.event)) {
      throw new Error('registerEventsToObject: Can not register an undefined event');
    }

    if (_.isUndefined(object[event.method])) {
      throw new Error('registerEventsToObject: ' + event.method + ' is undefined');
    }
    dispatcher.on(event.event, object[event.method].bind(object));
  });
}

dispatcher.registerEventsToObject = registerEventsToObject;

module.exports = dispatcher;