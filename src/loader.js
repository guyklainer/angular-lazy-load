
( function( window, document, angular ){

	window.name = "NG_DEFER_BOOTSTRAP!" + window.name;

	var loaded 		= [],
		toLoad		= [],
		main		= false,
		original 	= angular.module,
		bootstrap 	= angular.bootstrap,
		atts 		= [ "ng-app", "data-ng-app", "x-ng-app" ];

	var moduleTemplate = angular.module("loaderModuleExplorer", [] );

	angular.forEach( atts, function( attr ){
		var appElement = angular.element( "[" + attr + "]" );

		if( appElement.length > 0 ){
			main = appElement.attr( attr );

			return false;
		}
	});

	angular.bootstrap = function(){
		var modules = arguments[1];

		main = modules[0];

		bootstrap.apply( this, arguments );
	};

	angular.module = function( name, requires, configFn ){
		return new Loader( name, requires, configFn, this );
	};

	function Loader( name, requires, configFn, context ){

		this.deferred 	= new jQuery.Deferred();
		this.requires 	= requires;
		this.moduleArgs = arguments;
		this.context 	= context;

		Array.prototype.splice.call( this.moduleArgs, ( -1 ) );

		if( main === false )
			main = name;

		if( requires && loaded.indexOf( name ) == -1 ){

			if( requires.length == 0 )
				return this.applyOriginal();

			this.requires.forEach( this.requireHandler.bind( this ) );

		} else
			return this.applyOriginal();

		return this.moduleWithPromise();
	}

	Loader.prototype.moduleWithPromise = function(){
		var mock = {};

		for( var key in moduleTemplate ){
			if( moduleTemplate.hasOwnProperty( key ) ){

				if( typeof moduleTemplate[key] == "function" )
					mock[key] = this.decorateModule( key );
				else
					mock[key] = moduleTemplate[key];
			}
		}

		return mock;
	};

	Loader.prototype.decorateModule = function( type ){
		var self = this;

		return function(){
			var args 	= arguments,
				promise	= self.deferred.promise();

			promise.then( function( module ){
				module[type].apply( this, args );

				if( module.name == main )
					angular.resumeBootstrap();
			});
		}
	};

	Loader.prototype.requireHandler = function( require, index ){

		if( require.split("/").length > 1 )
			this.load( require, index );

		else if( loaded.indexOf( require ) == -1 )
			loaded.push( require );

	};

	Loader.prototype.load = function( require, index ){
		var self = this,
			path = require.replace(".js", "" ).split( "/" );

		if( require.charAt( 0 ) == "/" )
			path.splice( 0, 1 );

		if( path[path.length-1] == path[path.length-2] )
			path.splice( -1 );

		// Adding the script tag to the head as suggested before
		var head 	= document.getElementsByTagName('head')[0];
		var script 	= document.createElement('script');

		script.type = 'text/javascript';
		script.src 	= require;

		if( angular.lazyLoaderRoot && path[0] != angular.lazyLoaderRoot )
				path.unshift( angular.lazyLoaderRoot );

		require = path.join( "." );

		toLoad.push( { context : this, params : [ require, index ] } );

		// Then bind the event to the callback function.
		// There are several events for cross browser compatibility.
		script.onload = script.onreadystatechange = function(){
			var params = toLoad.pop();
			self.scriptLoaded.apply( params.context, params.params );
		};


		// Fire the loading
		head.appendChild(script);
	};

	Loader.prototype.scriptLoaded = function( moduleName, index ){

		loaded.push( moduleName );

		this.moduleArgs[1][index] = moduleName;

		if( this.isAllLoaded() )
			this.deferred.resolve( this.applyOriginal() );
	};

	Loader.prototype.applyOriginal = function(){
		return original.apply( this.context, this.moduleArgs );
	};

	Loader.prototype.isAllLoaded = function(){
		for( var index in this.requires ){
			if( this.requires.hasOwnProperty( index ) )
				if( loaded.indexOf( this.requires[index] ) == -1 )
					return false;
		}

		return true;
	};

})( window, document, angular );
