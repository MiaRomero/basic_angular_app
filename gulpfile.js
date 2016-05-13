const gulp = require('gulp');
const eslint = require('gulp-eslint');
const cp = require('child_process');
const webpack = require('webpack-stream');
const protractor = require('gulp-protractor').protractor;
var children = [];

var serverFiles = ['lib/**/*.js', 'test/**/*test.js', 'gulpfile.js',
                'index.js', 'server.js'];
var browserFiles = ['app/**/*.js'];

// lint tasks
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

gulp.task('lint', ['lint_client', 'lint_server']);

// build tasks
gulp.task('webpack_dev', ['lint'], () => {
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

gulp.task('build_dev', ['webpack_dev', 'static_dev', 'css_dev']);

// protractor tasks
gulp.task('startServer', ['build_dev'], () => {
  children.push(cp.fork('server.js'));
});

gulp.task('protractor', ['startServer'], () => {
  return gulp.src('test/integration/**/*spec.js')
  .pipe(protractor({
    configFile: 'test/integration/config.js'
  }))
  .on('end', () => {
    children.forEach( (child) => {
      child.kill('SIGTERM');
    });
  });
});

gulp.task('default', ['build_dev']);
