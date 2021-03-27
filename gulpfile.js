const gulp = require('gulp');
const { series, parallel } = require('gulp');

const htmltidy = require('gulp-htmltidy');
const autoprefixer = require('gulp-autoprefixer');
const csslint = require('gulp-csslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');

const connect = require('gulp-connect');

const firefoxDriver = require('./tests/firefox-webdriver.js');
const chromeDriver = require('./tests/chrome-webdriver.js');
const stopwatchTestIn = require('./tests/stopwatch.test.js');

/**
 * Linting and building
 */
function html() {
    return gulp.src('src/index.html')
        .pipe(htmltidy())
        .pipe(gulp.dest('build'));
}

function css() {
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
}

function jsCheck() {
    return gulp.src('src/stopwatch.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
}

function jsBuild() {
    return gulp.src('src/stopwatch.js')
        .pipe(babel({
            presets: ['@babel/preset-env'],
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
}

/**
 * Local server tasks
 */
gulp.task('server:open', async function() {
    return connect.server({
        root: 'build',
      });
});

gulp.task('server:close', async function() {
    connect.serverClose();
});

/**
 * Test tasks
 */
function testIn(browserDriver) {
    return () => {
            return stopwatchTestIn(browserDriver)
                .finally(() => browserDriver.quit());
        }
}


gulp.task('test:firefox', testIn(firefoxDriver));
gulp.task('test:chrome', testIn(chromeDriver));

gulp.task('test:e2e', 
    parallel(
        'server:open', 
        series('test:firefox', 'test:chrome', 'server:close')
        )
    );

exports.html = html;
exports.css = css;
exports.jsCheck = jsCheck;
exports.jsBuild = jsBuild;
exports.default = series(html, css, jsCheck, jsBuild);;