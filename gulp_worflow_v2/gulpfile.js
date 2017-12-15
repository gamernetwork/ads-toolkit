var gulp = require('gulp');
// Require Plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var inlinesource = require('gulp-inline-source');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass') // Gets all files ending with .scss in app/scss and children directories
		.pipe(sass()) // Convert sass to css
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  	browserSync.init({
    	server: {
      	baseDir: 'app'
    	},
  	});
});

gulp.task('images', function(){
  	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
      .pipe(imagemin([
          imagemin.optipng({optimixationLevel: 5}),
        ]))
	  	.pipe(gulp.dest('dist/images'));
});

gulp.task('useref', function(){
  	return gulp.src('app/*.html')
    	.pipe(useref())
    	.pipe(gulpIf('*.js', uglify()))
    	.pipe(gulpIf('*.css', cssnano()))
    	.pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback){
	console.log('Pre-Building');
  runSequence(['images', 'sass', 'useref'],
    'prefix',
    callback
    );
});

gulp.task('prefix', function(){
    gulp.src('dist/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compile-ad', function () {
    return gulp.src('dist/*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./final-build'));
});

