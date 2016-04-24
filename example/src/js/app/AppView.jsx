'use strict';

module.exports = (React, actions) => {
  return React.createClass({
    displayName: 'App',

    render() {
      return (
        <div>
          <button onClick={actions.test}>TestButton</button>
        </div>
      );
    }
  });
};