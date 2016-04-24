'use strict';

module.exports = (dispatcher, events) => {
  dispatcher.on(events.Test, () => {
    console.log('test successful');
  });
};