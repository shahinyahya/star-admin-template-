'use strict'
// var gulp = require('gulp');
// var requireDir = require('require-dir');

import gulp from 'gulp'
import requireDir from 'runsa-require-dir';
import browserSync from  'browser-sync'
import sass  from 'gulp-sass'
import gutil from  'gulp-util'
import plumber from  'gulp-plumber'
import notify from  'gulp-notify'
import sourcemaps from  'gulp-sourcemaps'
import autoprefixer  from 'gulp-autoprefixer'


let browse = browserSync.create()

requireDir('gulp-tasks');

gulp.paths = {
    dist: 'dist',
};

const paths = gulp.paths;

gulp.task('serve', () => {

    browse.init({
        port: 3000,
        server: "src",
        ghostMode: false,
        notify: false
    });


    gulp.watch('src/assets/scss/**/*.scss', gulp.series['sass']);
    gulp.watch('src/assets/**/*.scss').on('change', browse.reload);
    gulp.watch('src/assets/**/*.html').on('change', browse.reload);
    gulp.watch('src/assets/**/*.css').on('change', browse.reload);

})

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

gulp.task('default', gulp.series('serve'));

