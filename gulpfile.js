const gulp    = require('gulp');
const seq     = require('run-sequence');
const webpack = require('gulp-webpack');
const uglify  = require('gulp-uglify');
const zip     = require('gulp-zip');
const del     = require('del');

gulp.task('default', (cb) => seq('clean', 'build', cb));

gulp.task('watch', ['default'], () => {
  gulp.watch('app/**/*', ['webpack']);
  gulp.watch('static/**/*', ['static']);
});

gulp.task('build', ['webpack', 'vendor', 'static']);

gulp.task('webpack', () =>
  gulp.src('app/main.jsx')
    .pipe(webpack({
      output: { filename: 'main.js' },
      externals: { react: 'React' },
      module: {
        loaders: [
          { test: /\.jsx$/, loader: 'babel', query: { presets: ['es2015', 'react'] }},
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.less$/, loader: 'style/useable!css!less' }
        ]
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/extension')));

gulp.task('vendor', () =>
  gulp.src('node_modules/react/dist/react.min.js')
    .pipe(gulp.dest('build/extension')));

gulp.task('static', () =>
  gulp.src('static/**/*')
    .pipe(gulp.dest('build/extension')));

gulp.task('clean', (cb) => del('build/', cb));

gulp.task('zip', () =>
  gulp.src('build/extension/**/*')
    .pipe(zip('extension.zip'))
    .pipe(gulp.dest('build/')));
