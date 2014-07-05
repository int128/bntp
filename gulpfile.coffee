gulp = require('gulp')
coffee = require('gulp-coffee')
ngmin = require('gulp-ngmin')
uglify = require('gulp-uglify')
less = require('gulp-less')
clean = require('gulp-rimraf')
zip = require('gulp-zip')
bower = require('bower')

gulp.task 'bower', ->
  bower.commands.install().on 'end', (installed) ->
    gulp.src([
      'bower_components/angular/angular.min.js'
    ]).pipe gulp.dest('build/extension/')

gulp.task 'js', ->
  gulp.src('src/main/coffeescript/*')
    .pipe(coffee())
    .pipe(ngmin())
    .pipe(uglify())
    .pipe gulp.dest('build/extension/')

gulp.task 'css', ->
  gulp.src('src/main/less/*')
    .pipe(less())
    .pipe gulp.dest('build/extension/')

gulp.task 'static', ->
  gulp.src('src/main/static/*')
    .pipe gulp.dest('build/extension/')

gulp.task 'zip', ->
  gulp.src('build/extension/*')
    .pipe(zip('extension.zip'))
    .pipe gulp.dest('build/')

gulp.task 'clean', ->
  gulp.src('build/').pipe clean()

gulp.task 'watch', ->
  gulp.watch 'src/main/*/*', -> gulp.start 'js', 'css', 'static'

gulp.task 'default', ['clean'], ->
  gulp.start 'bower', 'js', 'css', 'static'
