
var gulp 	= require('gulp'),
	uglify 	= require( 'gulp-uglify' ),
	concat 	= require( 'gulp-concat' );

gulp.task('uglify', function() {
	gulp.src('src/*.js')
		.pipe( concat('loader.min.js') )
		.pipe( uglify() )
		.pipe( gulp.dest('dist') )
		.pipe( gulp.dest('example') );
});

