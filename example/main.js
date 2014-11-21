( function( angular ){

	var module = angular.module( "example", [
		'base/example/view1/view1.js'
	]);

	module.controller( "a", function( $scope ){
		console.log( "a ctrl loaded" );
		$scope.status = "loaded";
	});

})( angular );