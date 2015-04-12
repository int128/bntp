gulp = require('gulp')
coffee = require('gulp-coffee')
uglify = require('gulp-uglify')
less = require('gulp-less')
zip = require('gulp-zip')
del = require('del')

sources =
  coffee: 'src/main/coffeescript/**/*'
  less:   'src/main/less/**/*'
  static: 'src/main/static/**/*'

gulp.task 'coffee', ->
  gulp.src(sources.coffee)
    .pipe(coffee())
    .pipe(uglify())
    .pipe gulp.dest('build/extension/')

gulp.task 'less', ->
  gulp.src(sources.less)
    .pipe(less())
    .pipe gulp.dest('build/extension/')

gulp.task 'static', ->
  gulp.src(sources.static)
    .pipe gulp.dest('build/extension/')

gulp.task 'default', ['clean'], ->
  gulp.start 'coffee', 'less', 'static'

gulp.task 'watch', ['default'], ->
  gulp.watch sources.coffee, ['coffee']
  gulp.watch sources.less,   ['less']
  gulp.watch sources.static, ['static']

gulp.task 'clean', (cb) -> del 'build/', cb

gulp.task 'zip', ->
  gulp.src('build/extension/**/*')
    .pipe(zip('extension.zip'))
    .pipe gulp.dest('build/')
