var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('server/sass/styles.scss')
  .pipe(sass())
  .pipe(gulp.dest('server/public/css'));

  gulp.src('server/sass/admin_styles.scss')
  .pipe(sass())
  .pipe(gulp.dest('server/public/css'));
});



gulp.task('watch', function () {
  gulp.watch('server/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass','watch']);