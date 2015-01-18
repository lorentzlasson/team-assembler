app.controller('MainCtrl', function($scope, MainService){

	$scope.profiles = [];

	MainService.loadToken();

	$scope.searchProfile = function(){
		MainService.searchProfile($scope.searchText, function(profile){
			$scope.profiles.push(profile);			
		});

		$scope.searchText = null;
	}
});
