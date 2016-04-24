'use strict';

let map                    = {};
let dependenciesResolved   = {};
let dependenciesUnresolved = {};

const registry = {
  add(name, job, deps) {
    job  = dependencies[dependencies.length - 1];
    deps = dependencies.slice(0, dependencies.length - 1).concat([this.register]);
    job  = job.apply(this, deps);
    dependenciesUnresolved[name] = {
      job: job,
      deps: deps
    }
  },

  addVendor(name, job) {
    dependenciesResolved[name] = job;
  },

  get(name) {
    return dependenciesResolved[name];
  }
};

module.exports = registry;