
( function( angular ){

	var module = angular.module("example.view1.view1_dependency", []);

	module.controller( "b", function( $scope ){
		console.log( "view1_dep ctrl loaded" );
		$scope.status = "loaded";
	});

})( angular );