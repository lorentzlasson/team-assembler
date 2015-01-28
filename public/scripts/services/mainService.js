app.factory('MainService', function ($http, $window, $location, $routeParams, $route) {
	var url = $location.absUrl();
	var redirectLinkedin = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=75s8qsnoh8jt7w&state=DCEEFWF45453sdffef424&redirect_uri="+url;

	var token;

	return {
		searchProfile: function(searchText, callback){
			var parts = searchText.split(/\s+/);
			var firstName = parts[0];
			var lastName = parts[1];

			var path = "/people-search?firstName="+firstName+"&lastName="+lastName+"&token="+token.access_token;
			$http.get(path)
			.success(function(response){
				callback(response);
			})
		},

		loadToken: function(){
			if (!token) {
				var code = $location.search().code;
				var state = $location.search().state;

				if (!code && !state) {
					$window.location.href = redirectLinkedin;
				}
				else {
					// console.log(code);					
					if (state === "DCEEFWF45453sdffef424"){
						$http.post("/access-token?code="+code)
						.success(function(response){
							console.log(response);
						 	token = response;
						})
					}
				}
			}
		}
	}
});