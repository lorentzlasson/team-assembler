app.factory('MainService', function ($http, $window, $location, $routeParams, $route) {
	// var redirectLinkedin = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=752qtw90g4zrsy&state=DCEEFWF45453sdffef424&redirect_uri=http://profilelister.eu-gb.mybluemix.net";
	
	var redirectLinkedin = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=752qtw90g4zrsy&state=DCEEFWF45453sdffef424&redirect_uri=http://127.0.0.1:3000";

	var token;

	return {
		searchProfile: function(searchText, callback){
			var profile = {
				"firstName": "John",
				"lastName": "Doe",
				"title": "Manager",
				"profession": "IT Architect",
				"searchText": searchText
			};
			callback(profile);
		},

		loadToken: function(){
			if (!token) {

				var code = $location.search().code;
				var state = $location.search().state;

				if (!code && !state) {
					$window.location.href = redirectLinkedin;
				}
				else {
					console.log(code);					
					if (state === "DCEEFWF45453sdffef424"){
						$http.post("/accessToken?code="+code)
						.success(function(response){
							console.log(response);
						});
					}
				}
			};
		}
	}
});