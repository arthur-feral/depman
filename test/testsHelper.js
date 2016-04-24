'use strict';

global._      = require('lodash');
let chai      = require('chai');
let sinonChai = require('sinon-chai');
global.chai   = chai;
global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should;
global.sinon  = require('sinon');
chai.should();
chai.use(sinonChai);