'use strict';

describe('loader', function () {

	angular.resumeBootstrap = angular.noop;

	it("should load all the scripts", function(done){
		setTimeout(function() {
			done();
		}, 3000);
	});

	it('should load all the dependency modules dynamically', function(){
		var counter = 0;
		angular.forEach( document.querySelectorAll("script"), function( script ){
			if( script.src == "http://localhost:9876/base/example/view1/view1.js" ||
				script.src == "http://localhost:9876/base/example/view1/view1_dependency.js"  )
				counter++;
		});

		expect( counter ).toBe( 2 );
	});

	it('should update the requires array in "example" module', function(){
		expect( angular.module("example").requires.length ).toBe( 1 );
		expect( angular.module("example").requires[0] ).toBe( "example.view1" );
	});

	it('should update the requires array in "example.view1" module', function(){
		expect( angular.module("example.view1").requires.length ).toBe( 2 );
		expect( angular.module("example.view1").requires[1] ).toBe( "example.view1.view1_dependency" );
	});

	it('should also load external modules correctly', function(){
		expect( angular.module("external") ).toBeDefined();
	});

});