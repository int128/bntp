PRODUCTION = undefined
MODULES    = "#{__dirname}/node_modules"

gulp    = require 'gulp'
webpack = require 'gulp-webpack'
less    = require 'gulp-less'
zip     = require 'gulp-zip'
del     = require 'del'

gulp.task 'build', ['app', 'less', 'static']

gulp.task 'app', ->
  gulp.src 'app/main.jsx'
    .pipe webpack
      output:
        filename: 'app.js'
      resolve:
        alias:
          react: "#{MODULES}/react/dist/react#{if PRODUCTION then '.min' else ''}.js"
      module:
        noParse: [ /\.min\.js$/, /react\.js$/ ]
        loaders: [ test: /\.jsx$/, loader: 'jsx-loader' ]
    .pipe gulp.dest 'build/extension'

gulp.task 'less', ->
  gulp.src 'app/**/*.less'
    .pipe less()
    .pipe gulp.dest 'build/extension'

gulp.task 'static', ->
  gulp.src 'static/**/*'
    .pipe gulp.dest 'build/extension'


gulp.task 'watch', ['clean'], ->
  PRODUCTION = false
  gulp.start 'build'
  gulp.watch 'app/**/*', ['app', 'less']
  gulp.watch 'static/**/*', ['static']

gulp.task 'default', ['clean'], ->
  PRODUCTION = true
  gulp.start 'build'


gulp.task 'clean', (cb) -> del 'build/', cb

gulp.task 'zip', ->
  gulp.src('build/extension/**/*')
    .pipe(zip('extension.zip'))
    .pipe gulp.dest('build/')
