'use strict';

module.exports = ($, app) => {
  app.register('dispatcher', require('./dispatcher.js'));
  app.register('events', require('./events.js'));
  app.register('actions', ['dispatcher', 'events', require('./actions')]);
  return {
    AppView: app.register('AppView', ['React', 'actions', require('./AppView.jsx')])
  };
};