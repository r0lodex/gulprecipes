var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del')

// SASS Processor
gulp.task('styles', function() {
  return sass('src/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }))
})

// Javascript Concats
// gulp.task('scripts', function() {
//  return gulp.src('src/scripts/**/*.js')
//    .pipe(jshint('.jshintrc'))
//    .pipe(jshint.reporter('default'))
//    .pipe(concat('main.js'))
//    .pipe(gulp.dest('dist/assets/js'))
//    .pipe(rename({suffix: '.min'}))
//    .pipe(uglify())
//    .pipe(gulp.dest('dist/assets/js'))
//    .pipe(notify({ message: 'Scripts task complete' }))
// })

// Setup image compression
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }))
})

// Before deploying, it’s a good idea to clean out the destination folders
// and rebuild the files—just in case any have been removed from the source
// and are left hanging out in the destination folder:
gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'])
})

// The Task Runner
gulp.task('default', ['clean'], function() {
    gulp.start('styles', /*'scripts', */ 'images');
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/*.scss', ['styles'])
  gulp.watch('src/scripts/**/*.js', ['scripts'])
  gulp.watch('src/images/**/*', ['images'])
  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);
})