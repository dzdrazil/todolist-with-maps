'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('vendor', function() {
  return gulp.src('src/vendor/**')
    .pipe(gulp.dest('web/vendor'));
});

gulp.task('template', function() {
  return gulp.src('src/index.dev.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('web'));
});

gulp.task('build', function() {
  var DEST = 'web/scripts';
  return gulp.src('src/scripts/**/*.js')
    .pipe(changed(DEST))
    .pipe(babel({
      modules: 'amd',
      loose: ['es6.classes', 'es6.properties.computed', 'es6.templateLiterals', 'es6.forOf', 'es6.modules']
    }))
    .pipe(gulp.dest(DEST));
});

gulp.task('watch', function() {
  return gulp.watch('src/scripts/**/*.js', ['build']);
});

gulp.task('default', ['vendor','template','watch','build']);

gulp.task('clean', function (cb) {
  del('web/**/*', cb);
});
