'use strict';

const errors = require('./errors');
let registry = require('./registry');

const checkArgs = (name, dependencies) => {
  if (!name) {
    throw new errors.NameError;
  }

  if (!dependencies) {
    throw new errors.MissingJobError;
  }
  
  return true;
};

/**
 * App components are registered with this method
 * @param name {string} The component name
 * @param dependencies {array|function} services names
 * the current service depends
 */
const register = (name, dependencies) => {
  let job;
  let deps;

  checkArgs(name, dependencies);

  /**
   * in case we provide just a job to do without dependencies
   */
  if (typeof dependencies === 'function') {
    job = dependencies.bind(this, this);
  }

  /**
   * in case we provide a list of dependencies with the job
   */
  if (typeof dependencies === 'object') {
    if (Array.isArray(dependencies)) {
      registry.add(name, dependencies);
      job = registry.get(name);
    } else {
      job = dependencies;
    }
  }

  return job;
};


const vendor = (name, vendor) => {
  checkArgs(name, vendor);

  registry.addVendor(name, vendor);
  return registry.get(name);
};

/**
 * @constructor
 */
let Depman = function() {
  return this;
};

Depman.prototype.register = register;
Depman.prototype.vendor   = vendor;

module.exports = () => {
  return new Depman();
};