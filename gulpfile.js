const gulp = require('gulp');
const { series } = require('gulp');

const htmltidy = require('gulp-htmltidy');
const autoprefixer = require('gulp-autoprefixer');
const csslint = require('gulp-csslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');

const connect = require('gulp-connect');

gulp.task('server', function() {
    connect.server({
        root: 'build',
      });
});

function html(cb) {
    return gulp.src('src/index.html')
        .pipe(htmltidy())
        .pipe(gulp.dest('build'));
    cb();
}

function css(cb) {
    return gulp.src('src/styles.css')
        .pipe(csslint({
            'order-alphabetical': false,
            'universal-selector': false,
            'box-sizing': false,
            'box-model': false
        }))
        .pipe(csslint.formatter('compact'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('build'));
    cb();
}

function jsCheck(cb) {
    return gulp.src('src/stopwatch.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
    cb();
}

function jsBuild(cb) {
    return gulp.src('src/stopwatch.js')
        .pipe(babel({
            presets: ['@babel/preset-env'],
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
    cb();
}

exports.html = html;
exports.css = css;
exports.jsCheck = jsCheck;
exports.jsBuild = jsBuild;
exports.default = series(html, css, jsCheck, jsBuild);;