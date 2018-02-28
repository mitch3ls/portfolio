const gulp = require('gulp')
const sass = require('gulp-sass')
const liveServer = require('gulp-live-server')
const browserify = require('gulp-browserify')
const open = require('opn')

gulp.task('html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
})

gulp.task('javascript', () => {
  return gulp.src('./src/js/*.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest('./build/js'))
})

gulp.task('watch', () => {
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/sass/*.sass', ['sass'])
  gulp.watch('./src/js/*.js', ['javascript'])
})

gulp.task('serve', () => {
  const server = liveServer.static('build', 3000)
  server.start()

  open('http://localhost:3000')

  gulp.watch('build/**/*', file => server.notify.apply(server, [file]))
})

gulp.task('default', ['html', 'sass', 'javascript', 'serve', 'watch'])