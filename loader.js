
( function( window, document ){

	var delegate 	= window.angular.module,
		loaded 		= [];

	window.angular.lazyModule = function( name, requires, configFn ){

		var deferred 	= new jQuery.Deferred(),
			index		= 0;

		if( requires ){

			requires.forEach( function( require, i ){
				var path = require.split( "/" );

				if( path.length > 1 ){
					var pathStr = angular.root + require + ".js";
					load( pathStr, function(){
						loaded.push( require );
						if( path[path.length-1] == path[path.length-2] )
							path.splice( path.length-1, 1 );

						requires[i] = path.filter(function(a){return a != ""}).join( "." );

						if( ++index == requires.length )
							deferred.resolve( delegate.apply( this, [ name, requires, configFn ] ) );
					});

				} else
					loaded.push(null);
			});

		} else
			return delegate.apply( this, [ name, requires, configFn ] );

		return deferred.promise();
	};

	function load( path, callback ){
		// Adding the script tag to the head as suggested before
		var head 	= document.getElementsByTagName('head')[0];
		var script 	= document.createElement('script');

		script.type = 'text/javascript';
		script.src 	= path;

		// Then bind the event to the callback function.
		// There are several events for cross browser compatibility.
		script.onload = script.onreadystatechange = callback;

		// Fire the loading
		head.appendChild(script);
	}

})( window, document );

angular.root = "js";
var appPromise = angular.module("example", [
	'ngReactGrid',
	'ngSanitize',
	'ui.select',
	'ui.router',
	"general",
	"debug",
	'/datahub/layout/layout'
]);