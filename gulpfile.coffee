gulp    = require 'gulp'
webpack = require 'gulp-webpack'
less    = require 'gulp-less'
zip     = require 'gulp-zip'
del     = require 'del'

gulp.task 'app', ->
  gulp.src 'app/main.jsx'
    .pipe webpack
      output:
        filename: 'app.js'
      resolve:
        alias:
          'react': "#{__dirname}/node_modules/react/dist/react.min.js"
      module:
        noParse: /\.min\.js$/
        loaders: [ test: /\.jsx$/, loader: 'jsx-loader' ]
    .pipe gulp.dest 'build/extension'

gulp.task 'less', ->
  gulp.src 'app/**/*.less'
    .pipe less()
    .pipe gulp.dest 'build/extension'

gulp.task 'static', ->
  gulp.src 'static/**/*'
    .pipe gulp.dest 'build/extension'

gulp.task 'default', ['clean'], ->
  gulp.start 'app', 'less', 'static'

gulp.task 'watch', ['default'], ->
  gulp.watch 'app/**/*', ['app', 'less']
  gulp.watch 'static/**/*', ['static']

gulp.task 'clean', (cb) -> del 'build/', cb

gulp.task 'zip', ->
  gulp.src('build/extension/**/*')
    .pipe(zip('extension.zip'))
    .pipe gulp.dest('build/')
