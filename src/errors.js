'use strict';

function NameError(){
  this.name = 'NameError';
  this.message = 'You must specify the component name';
}

function MissingJobError(){
  this.name = 'MissingJobError';
  this.message = 'You must give at most a job to do';
}

module.exports = {
  NameError,
  MissingJobError
};