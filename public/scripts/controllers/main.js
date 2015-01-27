app.controller('MainCtrl', function($scope, MainService, MockService){
	MainService = MockService;

	$scope.searchedProfiles = [];
	$scope.suggestedProfiles = [];
	$scope.selectedProfiles = [];

	MainService.loadToken();

	$scope.searchProfile = function(){
		MainService.searchProfile($scope.search.text, function(suggestions){
			$scope.search.suggestions = suggestions;

			var search = angular.copy($scope.search);
			$scope.searchedProfiles.push(search);
			$scope.focusSearchedProfile(search);
			$scope.search = null;
		})
	}

	$scope.focusSearchedProfile = function(searched){
		$scope.suggestedProfiles = searched.suggestions;
		toggleItemInList(
			$scope.searchedProfiles,
			function(item){
				return item == searched;
			},
			function(item, value){
				item.focused = value;
			}
		);
	}

	$scope.dropSelectedProfile = function(data, evt){
		toggleItemInList(
			$scope.suggestedProfiles,
			function(item){
				return item == data;
			},
			function(item, value){
				item.selected = value;

				// remove all current selections from this search
				var index = $scope.selectedProfiles.indexOf(item);
				if (index > -1) {
			    	$scope.selectedProfiles.splice(index, 1);
				}
			}
		);

		$scope.selectedProfiles.push(data);
	}

	function toggleItemInList(list, condition, toggleItem){
		changeItemInList(list, function(item){
			toggleItem(item, condition(item))
		});
	}

	function changeItemInList(list, change){
		for (var i = list.length - 1; i >= 0; i--) {
			var item = list[i];
			change(item);
		}
	}
});
