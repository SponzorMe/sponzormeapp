var gulp = require('gulp');
var bower = require('bower');
var sh = require('shelljs');
var paths = require('./gulp.config.json');
//Gulps
var gutil = require('gulp-util');
var bytediff = require('gulp-bytediff');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var inject = require('gulp-inject');


gulp.task('default', ['dev']);

gulp.task('sass', function(done) {

  var dest = paths.build + 'css';

  gulp.src( paths.sass )
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest( dest ))
    .pipe(bytediff.start())
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(bytediff.stop(bytediffFormatter))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest( dest ))
    .on('end', done);
});

/**
 * Minify and bundle the js
 */
gulp.task('js', function(done) {

  var dest = paths.build + 'js';

  gulp.src( paths.js )
    .pipe(concat('app.js'))
    .pipe(bytediff.start())
    .pipe(gulp.dest( dest))
    .pipe(uglify())
    .pipe(bytediff.stop(bytediffFormatter))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest( dest ))
    .on('end', done);
});

/**
 * Watch files and build
 */
gulp.task('watch', function() {
  //Watching all files
  gulp.watch( paths.sass, ['sass']);
  gulp.watch( paths.css, ['css']);
  //gulp.watch( paths.js, ['js']);
});


/**
 * Minify and bundle the vendors js
 */
gulp.task('vendorjs', function( done ) {
  //Bundling, minifying, and copying the Vendor JavaScript

  var dest = paths.build + 'js';

  gulp.src( paths.vendorjs )
    .pipe(concat('vendors.js'))
    .pipe(bytediff.start())
    .pipe(gulp.dest( dest ))
    .pipe(uglify())
    .pipe(bytediff.stop(bytediffFormatter))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest( dest ))
    .on('end', done);
});

/**
 * Minify and bundle the css
 */
gulp.task('css', function( done ) {

  var dest = paths.build + 'css';

  gulp.src( paths.css )
    .pipe(concat('app.css'))
    .pipe(bytediff.start())
    .pipe(gulp.dest( dest ))
    .pipe(minifyCss())
    .pipe(bytediff.stop(bytediffFormatter))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest( dest ))
    .on('end', done);
});

gulp.task('release', [ 'sass', 'css', 'vendorjs', 'js' ] , function ( done ) {
  var css = gulp.src( paths.includeCss, {read: false});
  var vendors = gulp.src( paths.includeVendors, {read: false});
  var js = gulp.src( paths.includeJs, {read: false});
  
  gulp.src( paths.index )
    .pipe( inject( css , {relative: true} ))
    .pipe( inject( vendors , {relative: true, name: 'head'} ))
    .pipe( inject( js, {relative: true} ))
    .pipe( gulp.dest('./www') )
    .on('end', done);
});

/**
 * Copy fonts
 */
gulp.task('fonts', function( done ) {
  var dest = paths.build + 'fonts';
  gulp
    .src(paths.fonts)
    .pipe(gulp.dest(dest))
    .on('end', done);
});

gulp.task('dev', [ 'sass' ] , function ( done ) {
  var css = gulp.src( paths.css, {read: false});
  var vendors = gulp.src( paths.vendorjs, {read: false});
  var js = gulp.src( paths.js, {read: false});
  
  gulp.src( paths.index )
    .pipe( inject( css , {relative: true} ))
    .pipe( inject( vendors , {relative: true, name: 'head'} ))
    .pipe( inject( js, {relative: true} ))
    .pipe( gulp.dest('./www') )
    .on('end', done);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted percentage
 */
function formatPercent(num, precision) {  
    return (num * 100).toFixed(precision);
}
