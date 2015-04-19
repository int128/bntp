gulp    = require 'gulp'
webpack = require 'gulp-webpack'
less    = require 'gulp-less'
zip     = require 'gulp-zip'
del     = require 'del'

gulp.task 'build', ['app', 'less', 'static']

gulp.task 'app', ->
  gulp.src 'app'
    .pipe webpack
      entry:
        app: './app/main.jsx'
        vendor: ['react']
      output:
        filename: '[name].js'
      resolve:
        alias:
          react: "#{__dirname}/node_modules/react/dist/react.min.js"
      module:
        noParse: /\.min\.js$/
        loaders: [ test: /\.jsx$/, loader: 'jsx-loader' ]
      plugins: [
        new (require 'webpack').optimize.CommonsChunkPlugin('vendor', 'vendor.js')
        new (require 'webpack').optimize.UglifyJsPlugin exclude: /vendor\.js$/
      ]
    .pipe gulp.dest 'build/extension'

gulp.task 'less', ->
  gulp.src 'app/**/*.less'
    .pipe less()
    .pipe gulp.dest 'build/extension'

gulp.task 'static', ->
  gulp.src 'static/**/*'
    .pipe gulp.dest 'build/extension'


gulp.task 'watch', ['clean'], ->
  gulp.start 'build'
  gulp.watch 'app/**/*', ['app', 'less']
  gulp.watch 'static/**/*', ['static']

gulp.task 'default', ['clean'], ->
  gulp.start 'build'


gulp.task 'clean', (cb) -> del 'build/', cb

gulp.task 'zip', ->
  gulp.src('build/extension/**/*')
    .pipe(zip('extension.zip'))
    .pipe gulp.dest('build/')
