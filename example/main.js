( function( angular ){

	angular.lazyLoaderRoot = "example";

	var module = angular.module( "example", [
		'/loader/example/view1/view1.js'
	]);

	module.controller( "a", function( $scope ){
		console.log( "a ctrl loaded" );
		$scope.status = "loaded";
	});

})( angular );