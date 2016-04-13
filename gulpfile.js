/*
 * gulp 打包
 * */

var gulp = require('gulp'),
    del = require('del'),  //删除清空文件夹
    rename = require('gulp-rename'),    //重命名
    uglify = require('gulp-uglify');    //js压缩

// Task: js uglify
gulp.task('js', function () {
    return gulp.src(['./dist/drop.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function () {
    gulp.start('js');
});

// Default task
gulp.task('default', ['build']);


