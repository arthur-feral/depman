'use strict';

const depman = require('../../../');
let myapp    = depman();
myapp.vendor('$', require('jquery'));
myapp.vendor('React', require('react'));
let ReactDOM  = myapp.vendor('ReactDOM', require('react-dom'));
let app       = myapp.register('app', ['$', require('./app')]);
const AppView = app.AppView;


ReactDOM.render(<AppView />, document.getElementById('appContainer'));
