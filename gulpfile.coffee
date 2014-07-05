gulp = require('gulp')
coffee = require('gulp-coffee')
ngmin = require('gulp-ngmin')
uglify = require('gulp-uglify')
less = require('gulp-less')
clean = require('gulp-rimraf')
bower = require('bower')

gulp.task 'bower', ->
  bower.commands.install().on 'end', (installed) ->
    gulp.src([
      'bower_components/angular/angular.min.js'
    ]).pipe gulp.dest('./build/')

gulp.task 'js', ->
  gulp.src('app.coffee')
      .pipe(coffee())
      .pipe(ngmin())
      .pipe(uglify())
      .pipe gulp.dest('build/')

gulp.task 'css', ->
  gulp.src('app.less')
      .pipe(less())
      .pipe gulp.dest('build/')

gulp.task 'static', ->
  gulp.src([
    'manifest.json'
    'newtab.html'
    '*.png'
  ]).pipe gulp.dest('build/')

gulp.task 'clean', ->
  gulp.src('build/').pipe clean()

gulp.task 'watch', ->
  gulp.watch [
    '*.coffee'
    '*.less'
    '*.html'
  ], -> gulp.start 'js', 'css', 'static'

gulp.task 'default', ['clean'], ->
  gulp.start 'bower', 'js', 'css', 'static'
