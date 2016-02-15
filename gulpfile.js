// DEPENDENCIES
// ========================================
var gulp          = require('gulp'),
    sass          = require('gulp-ruby-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    cssnano       = require('gulp-cssnano'),
    jshint        = require('gulp-jshint'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    rename        = require('gulp-rename'),
    concat        = require('gulp-concat'),
    notify        = require('gulp-notify'),
    cache         = require('gulp-cache'),
    livereload    = require('gulp-livereload'),
    del           = require('del');

// DIRECTORY SETUP
// ========================================
var DIR = {
  SRC    : 'src/',
  DEST   : 'dist/'
}

DIR.JS = {
  SRC  : DIR.SRC  + 'js/**/*.js',
  DEST : DIR.DEST + 'js',
  MAIN : 'main.js',
  LINT : '.jshintrc'
};

DIR.SASS = {
  SRC  : DIR.SRC  + 'scss',
  DEST : DIR.DEST + 'css',
  MAIN : DIR.SRC  + 'scss/main.scss'
};

DIR.IMG = {
  SRC  : DIR.SRC  + 'img/**/*',
  DEST : DIR.DEST + 'img'
};

// TASK RUNNER
// ========================================
gulp.task('processSCSS', ProcessSCSS);
gulp.task('concatjs', ConcatJS);
gulp.task('compressImages', CompressImages);
gulp.task('cleanUp', CleanUp);

// The Runner
gulp.task('default', ['cleanUp'], function() {
    gulp.start('processSCSS', 'concatjs', 'compressImages');
})

// The Watcher
gulp.task('watch', function() {
  gulp.watch(DIR.SASS.SRC + '/*.scss', ['processSCSS'])
  gulp.watch(DIR.JS.SRC, ['concatjs'])
  gulp.watch(DIR.IMG.SRC, ['compressImages'])
  livereload.listen();
  gulp.watch([DIR.DEST + '**']).on('change', livereload.changed);
})

// GULP FUNCTIONS
// ========================================
function ProcessSCSS() {
  return sass(DIR.SASS.MAIN, { style: 'compressed' })
    .pipe(autoprefixer('Last 2 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest(DIR.SASS.DEST))
    .pipe(notify({ message: 'SCSS Compiled.' }))
}

function ConcatJS() {
  return gulp.src(DIR.JS.SRC)
   .pipe(jshint(DIR.JS.LINT))
   .pipe(jshint.reporter('default'))
   .pipe(concat(DIR.JS.MAIN))
   .pipe(rename({suffix: '.min'}))
   .pipe(uglify())
   .pipe(gulp.dest(DIR.JS.DEST))
   .pipe(notify({ message: 'Javascripts concatenated and minified. ' }))
}

function CompressImages() {
  return gulp.src(DIR.IMG.SRC)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(DIR.IMG.DEST))
    .pipe(notify({ message: 'Images compressed' }))
}

function CleanUp() {
  return del([DIR.DEST])
}