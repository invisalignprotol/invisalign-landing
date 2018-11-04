var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var ASSETS = {
  sass : 'assets/styles/*.scss',
  html : 'assets/*.html'
};

var DIST = {
  root  : 'docs/',
  css   : 'docs/styles',
  js    : 'docs/scripts'
};

gulp.task('sass', function(){
  return gulp.src(ASSETS.sass)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(gulp.dest(DIST.css));
});

gulp.task('copy', function() {
  gulp.src(ASSETS.html)
    .pipe(gulp.dest(DIST.root));
});

gulp.task('serve', ['sass'], function() {
  browserSync.init([DIST.css + '/*.css', DIST.root + '/*.html', DIST.js + '/*.js'], {
    server: {
      baseDir : DIST.root
    }
  });
});

gulp.task('watch', ['serve', 'sass', 'copy'], function() {
  gulp.watch([ASSETS.sass], ['sass']);
  gulp.watch([ASSETS.html], ['copy']);
});

gulp.task('default', ['watch']);
