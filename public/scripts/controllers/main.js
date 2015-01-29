app.controller('MainCtrl', function($scope, MainService, MockService){
	MainService = MockService;

	$scope.searchedProfiles = [];
	$scope.suggestedProfiles = [];
	$scope.selectedProfiles = [];

	$scope.csv = {
		fileName: "list",
		separator: ";"
	}	
	
	MainService.loadToken();

	$scope.searchProfile = function(){
		MainService.searchProfile($scope.search.text, function(suggestions){
			// Handle error
			// if (suggestions === Array) {
			// 	console.log(suggestions);
			// 	return;
			// };

			var search = angular.copy($scope.search);
			$scope.search = null;

			search.suggestions = suggestions;

			forEach(search.suggestions, function(item){
				item.search = search;
			});

			$scope.searchedProfiles.push(search);
			$scope.forceFocusSearchedProfile(search);

			if (search.suggestions.length === 1) {
				$scope.forceSelectProfile(search.suggestions[0]);
			}
		})
	}

	$scope.downloadAsCsv = function(){
		var profileList = angular.copy($scope.selectedProfiles);
		var keep = ['firstName', 'lastName', 'proffesion', 'company'];
		forEach(profileList, function(obj){	
			for (var prop in obj) {
		        if (keep.indexOf(prop) < 0) {
		            delete obj[prop];
		        }             
	    	}
		});

		return profileList;
	}
	
	$scope.forceFocusSearchedProfile = function(searched){
		focusSearchedProfile(searched);

		var hit = false;
		forEach($scope.suggestedProfiles, function(item){			
			if (item.selected) {
				focusSelectedProfile(item);
				hit = true
			}
		});

		if (!hit) {
			forEach($scope.selectedProfiles, function(item){
				item.focused = false;
			});
		}
	}

	$scope.forceFocusSelectedProfile = function(selected){
		focusSelectedProfile(selected);
		focusSearchedProfile(selected.search);
	}

	$scope.forceSelectProfile = function(selected){
		toggleItemInList(
			$scope.suggestedProfiles,
			function(item){
				return item.id === selected.id;
			},
			function(item, value){
				item.selected = value;
			}
		);
		selectProfile($scope.suggestedProfiles, selected);
		focusSelectedProfile(selected);
	}

	function focusSearchedProfile(searched){
		toggleItemInList(
			$scope.searchedProfiles,
			function(item){
				return item === searched;
			},
			function(item, value){
				item.focused = value;
			}
		);
		$scope.suggestedProfiles = searched.suggestions;
	}

	function focusSelectedProfile(selected){
		toggleItemInList(
			$scope.selectedProfiles,
			function(item){
				return item.id === selected.id;
			},
			function(item, value){
				item.focused = value;
			}
		);
	}

	function selectProfile(suggestions, profile){
		forEach(suggestions, function(item){
			// remove all current selections from this search
			var index = $scope.selectedProfiles.indexOf(item);
			if (index > -1) {
		    	$scope.selectedProfiles.splice(index, 1);
			}
		});
		profile.search.selectionComplete = true;
		$scope.selectedProfiles.push(profile);
	}

	function toggleItemInList(list, condition, toggleItem){
		forEach(list, function(item){
			toggleItem(item, condition(item))
		});
	}

	function forEach(list, change){
		for (var i = list.length - 1; i >= 0; i--) {
			var item = list[i];
			change(item);
		}
	}
});
