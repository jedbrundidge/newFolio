/**
 * Created by jed on 6/11/2016.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('client/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('client/css'))
});

gulp.task('watch', function(){
    gulp.watch('client/scss/*.scss', ['sass']);
});