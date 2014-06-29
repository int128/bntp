var gulp = require('gulp');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var clean = require('gulp-rimraf');

var bower = require('bower');

gulp.task('bower', function () {
    bower.commands
        .install()
        .on('end', function (installed) {
            gulp.src([
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/angular/angular.min.js'
                ])
                .pipe(gulp.dest('./build/'));
        });
});

gulp.task('js', function () {
    gulp.src('app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('css', function () {
    gulp.src('app.css')
        .pipe(csso())
        .pipe(gulp.dest('build/'));
});

gulp.task('static', function () {
    gulp.src(['manifest.json', 'newtab.html'])
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function () {
    gulp.src('build/')
        .pipe(clean());
});

gulp.task('default', ['clean'], function () {
    gulp.start('bower', 'js', 'css', 'static');
});
