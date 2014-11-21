( function( angular ){

	var external = angular.module("external", []);

	external.controller( "external", function( $scope ){
		console.log( "external ctrl loaded" );
		$scope.status = "loaded";
	});

})( angular );
