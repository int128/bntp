gulp    = require 'gulp'
concat  = require 'gulp-concat'
filter  = require 'gulp-filter'
addsrc  = require 'gulp-add-src'
webpack = require 'gulp-webpack'
less    = require 'gulp-less'
zip     = require 'gulp-zip'
del     = require 'del'

gulp.task 'build', ['webpack', 'less', 'static']

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
        ]
      plugins: [
        new (require 'webpack').optimize.UglifyJsPlugin()
      ]
    .pipe addsrc.prepend "#{__dirname}/node_modules/react/dist/react.min.js"
    .pipe concat 'main.js'
    .pipe gulp.dest 'build/extension'

gulp.task 'less', ->
  gulp.src 'app/**/*.less'
    .pipe filter ['**/*', '!**/_*']
    .pipe less()
    .pipe gulp.dest 'build/extension'

gulp.task 'static', ->
  gulp.src 'static/**/*'
    .pipe gulp.dest 'build/extension'


gulp.task 'watch', ['clean'], ->
  gulp.start 'build'
  gulp.watch 'app/**/*', ['webpack']
  gulp.watch 'app/**/*', ['less']
  gulp.watch 'static/**/*', ['static']

gulp.task 'default', ['clean'], ->
  gulp.start 'build'


gulp.task 'clean', (cb) -> del 'build/', cb

gulp.task 'zip', ->
  gulp.src('build/extension/**/*')
    .pipe(zip('extension.zip'))
    .pipe gulp.dest('build/')
