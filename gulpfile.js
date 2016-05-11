const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
var serverFiles = ['lib/**/*.js', 'test/**/*test.js', 'gulpfile.js',
                'index.js', 'server.js'];
var browserFiles = ['app/**/*.js'];

gulp.task('lint_server', () => {
  return gulp.src(serverFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint_client', () => {
  return gulp.src(browserFiles)
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

gulp.task('css_dev', () => {
  return gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('lint', ['lint_client', 'lint_server']);

gulp.task('build_dev', ['webpack_dev', 'static_dev', 'css_dev']);

gulp.task('default', ['build_dev']);
