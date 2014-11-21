
var gulp 	= require( 'gulp' ),
	uglify 	= require( 'gulp-uglify' ),
	concat 	= require( 'gulp-concat'),
	gutil 	= require( 'gulp-util' ),
	path 	= require( 'path' ),
	karma 	= require('karma').server;


gulp.task( 'uglify', function() {
	gulp.src( 'src/*.js' )
		.pipe( concat('loader.min.js') )
		.pipe( uglify() )
		.pipe( gulp.dest('dist') )
		.pipe( gulp.dest('example') );
});

gulp.task('test', function() {
	karma.start({
		configFile: path.join(__dirname, 'karma.conf.js'),
		browsers: ['PhantomJS'],
		singleRun: true
	}, function(code) {
		gutil.log('Karma has exited with ' + code);
		process.exit(code);
	});
});

gulp.task( 'watch', function(){
	gulp.watch( 'src/*.js', ['uglify'] );
});


