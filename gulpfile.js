var gulp         = require('gulp'),//Require all gulp files
 sass         	 = require('gulp-sass'),//Require all gulp files
 browser_sync    = require('browser-sync'),//Require all gulp files
 concat 		 = require('gulp-concat'),//Require all gulp files
 uglify 		 = require('gulp-uglifyjs'),//Require all gulp files
 cssnano 		 = require('gulp-cssnano'),//Require all gulp files
 rename 		 = require('gulp-rename');//Require all gulp files

gulp.task('sass', function() {
     gulp.src('./app/sass/*.sass')
//     	Выборка всех файлов из /app/sass/ с расширением *scss
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
        .pipe(browser_sync.reload({stream: true})); //Обновление браузерсинком
});
//Minification all js files in 1
gulp.task('uglify_scripts', function(){
	return gulp.src([
		'app/libs/owl/owl.carousel.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
})

//Css minification
gulp.task('css', ['sass'],  function(){
	return gulp.src('app/css/main.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

//Browser_sync base function
gulp.task('browser_sync', function(){
	browser_sync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

//Watch of updates (запускать его)
gulp.task('watch', ['browser_sync', 'css' ,'uglify_scripts'] , function() {
  gulp.watch('./app/sass/**/*.sass', ['css','sass']);
	gulp.watch('./app/sass/pages/index/*.sass', ['css','sass']);
	gulp.watch('./app/*.html', browser_sync.reload);
	gulp.watch('./app/*.php', browser_sync.reload);
	gulp.watch('./app/js/*.js', browser_sync.reload);
	gulp.watch('./app/css/**/*.css', browser_sync.reload);

});
