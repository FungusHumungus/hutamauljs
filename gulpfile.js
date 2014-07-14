var gulp = require('gulp'),
    jasmine = require('gulp-jasmine');

gulp.task('jasmine', function() {
    return gulp.src(['spec/*spec.js'])
        .pipe(jasmine());
});

gulp.task('watch', function() {
    gulp.watch(['spec/**', 'lib/**'], ['jasmine']);
});

gulp.task('default', ['watch', 'jasmine']);

