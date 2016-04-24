'use strict';

module.exports = (dispatcher, events) => {
  return {
    test() {
      dispatcher.emit(events.Test);
    }
  }
};