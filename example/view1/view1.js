( function( angular ){

	var module = angular.module( "example.view1", [
		"external",
		'view1/view1_dependency.js'
	]);

	module.controller( "c", function( $scope ){
		console.log( "view1 ctrl loaded" );
		$scope.status = "loaded";
	});

})( angular );