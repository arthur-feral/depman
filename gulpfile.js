'use strict';
var _       = require('lodash');
GLOBAL.gulp = require('gulp');
GLOBAL.$    = require('gulp-load-plugins')();

GLOBAL.babelify   = require('babelify');
GLOBAL.watchify   = require('watchify');
GLOBAL.browserify = require('browserify');
GLOBAL.source     = require('vinyl-source-stream');
GLOBAL.buffer     = require('vinyl-buffer');
GLOBAL.config     = require('./gulp/gulp-config.js');

/**
 * Print error in console
 * @param {Object} err
 */
GLOBAL.onError = function onError(err) {
  $.util.log($.util.colors.red(err));
  this.emit('end');
};

GLOBAL.getJSSources = function() {
  return config.js.src;
};

/**
 * returns js folder destination path
 * @return {string}
 */
GLOBAL.getJSDestPath = function() {
  return config.js.dest.path;
};

/**
 * returns js file destination name
 * @return {string|string}
 */
GLOBAL.getJSDestFilename = function() {
  return config.js.dest.file;
};

require('./gulp/javascript');

/**
 * Gulp task build files and clean useless files
 */
gulp.task('build', ['build-js']);

/**
 * Default task watch files
 */
gulp.task('default', ['watch-js']);