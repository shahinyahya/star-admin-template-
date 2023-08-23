'use strict'
// var gulp = require('gulp');
// var browserSync = require('browser-sync').create();
// var sass = require('gulp-sass');
// var gutil = require('gulp-util');
// var plumber = require('gulp-plumber');
// var notify = require('gulp-notify');
// var sourcemaps = require('gulp-sourcemaps');
// var autoprefixer = require('gulp-autoprefixer');

import gulp from  'gulp'
import browserSync from  'browser-sync'
import sass  from 'gulp-sass'
import gutil from  'gulp-util'
import plumber from  'gulp-plumber'
import notify from  'gulp-notify'
import sourcemaps from  'gulp-sourcemaps'
import autoprefixer  from 'gulp-autoprefixer'

let browse = browserSync.create()

gulp.task('sass', function () {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
                gutil.beep();
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(browse.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function () {

    browse.init({
        port: 3000,
        server: "src",
        ghostMode: false,
        notify: false
    });

    // gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sass'));
    // gulp.watch(['./src/assets/js/**/*.js', './**/*.html', './src/assets/css/**/*.css']).on('change', browserSync.reload);

    gulp.watch('src/assets/scss/**/*.scss', gulp.series['sass']);
    gulp.watch('src/assets/**/*.scss').on('change', browse.reload);
    gulp.watch('src/assets/**/*.html').on('change', browse.reload);
    gulp.watch('src/assets/**/*.css').on('change', browse.reload);

}));



gulp.task('sass:watch', function () {
    gulp.watch('src/assets/scss/**/*.scss');
});



// Static Server without watching scss files
gulp.task('serve:lite', function () {

    browse.init({
        server: "./",
        ghostMode: false,
        notify: false
    });

    gulp.watch('**/*.css').on('change', browse.reload);
    gulp.watch('**/*.html').on('change', browse.reload);
    gulp.watch('**/*.js').on('change', browse.reload);

});