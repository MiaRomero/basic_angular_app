const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
var allFiles = ['app/**/*.js', 'lib/**/*.js', 'test/**/*test.js', 'gulpfile.js',
                'index.js', 'server.js'];

gulp.task('lint', () => {
  return gulp.src(allFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack_dev', () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack( {
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static_dev', () => {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('build_dev', ['webpack_dev', 'static_dev']);

gulp.task('default', ['build_dev']);
