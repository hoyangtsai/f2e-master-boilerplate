const gulp = require('gulp');
const connect = require('gulp-connect');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const basePath = './src';

const paths = {
  css: basePath + '/**/*.css',
  other: [
    basePath + '/**/*.{jpe?g,png,svg}', 
    basePath + '/**/*.html', 
    basePath + '/**/*.js'
  ]
}

gulp.task('css', function () {
  let options = {
    browsers: ['last 5 version']
  };
  return gulp.src(paths.css)
    .pipe(postcss(
      [autoprefixer(options)]
    ))
    .pipe(gulp.dest('./dest'))
    .pipe(connect.reload());;
});

gulp.task('other', function () {
  return gulp.src(paths.other)
    .pipe(gulp.dest('./dest'))
    .pipe(connect.reload())
})

gulp.task('connect', ['css', 'other'], function () {
  connect.server({
    root: 'dest',
    port: 9000,
    livereload: true,
    index: false
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.other, ['other']);
});

gulp.task('default', ['watch', 'connect']);