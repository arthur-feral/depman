var _                 = require('lodash');
var browserifyOptions = {
  paths: ['./node_modules'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
};

var app = {
  source: getJSDestFilename(),
  dest: getJSDestPath(),
  fullPath: getJSDestPath() + getJSDestFilename(),
  entries: [getJSSources()],
  bundle: null
};

function prepareBundle(bundle) {
  bundle.bundle = browserify(_.merge(browserifyOptions, {
    entries: bundle.entries
  }))
    .transform(babelify.configure({
      extensions: ['.js', '.jsx'],
      presets: ['es2015', 'react']
    }));
}

/**
 * build browserify bundle
 * @param bundle
 * @return {*}
 */
function buildBundle(bundle) {
  $.util.log($.util.colors.yellow('Browserifying app...'));
  var buildTimer = $.duration($.util.colors.yellow('Bundled') + ' ' + $.util.colors.green(bundle.fullPath));
  return bundle.bundle
    .bundle()
    .on('error', onError)
    .pipe(source(bundle.source))
    .pipe(buffer())
    .pipe(buildTimer)
    .pipe(gulp.dest(getJSDestPath()))
    .on('end', function() {
      $.util.log($.util.colors.green('Created %s'), bundle.fullPath);
    });
}

gulp.task('watch-js', function() {
  if (app.bundle === null) {
    prepareBundle(app);
  }
  app.bundle = watchify(app.bundle);
  app.bundle
    .on('update', function() {
      $.util.log($.util.colors.green('Changes detected'));
      buildBundle(app);
    })
    .on('bytes', function(bytes) {
      if (bytes === 0) {
        return;
      }
      $.util.log($.util.colors.green('Done !'));
    });
  return buildBundle(app);
});

gulp.task('build-js', function() {
  prepareBundle(app);
  return buildBundle(app);
});
