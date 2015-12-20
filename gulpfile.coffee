gulp    = require 'gulp'
addsrc  = require 'gulp-add-src'
webpack = require 'gulp-webpack'
zip     = require 'gulp-zip'
del     = require 'del'

gulp.task 'build', ['webpack', 'static']

gulp.task 'webpack', ->
  gulp.src 'app/main.jsx'
    .pipe webpack
      output:
        filename: 'main.js'
      externals:
        react: 'React'
      module:
        loaders: [
          { test: /\.jsx$/, loader: 'jsx-loader' }
          { test: /\.json$/, loader: 'json-loader' }
          { test: /\.less$/, loader: 'style/useable!css!less' }
        ]
      plugins: [
        new (require 'webpack').optimize.UglifyJsPlugin()
      ]
    .pipe addsrc.prepend 'node_modules/react/dist/react.min.js'
    .pipe gulp.dest 'build/extension'

gulp.task 'static', ->
  gulp.src 'static/**/*'
    .pipe gulp.dest 'build/extension'


gulp.task 'watch', ['clean'], ->
  gulp.start 'build'
  gulp.watch 'app/**/*', ['webpack']
  gulp.watch 'static/**/*', ['static']

gulp.task 'default', ['clean'], ->
  gulp.start 'build'


gulp.task 'clean', (cb) -> del 'build/', cb

gulp.task 'zip', ->
  gulp.src('build/extension/**/*')
    .pipe(zip('extension.zip'))
    .pipe gulp.dest('build/')
