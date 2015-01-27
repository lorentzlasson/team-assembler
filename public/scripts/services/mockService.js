app.factory('MockService', function () {


	return {
		searchProfile: function(searchText, callback){
			var parts = searchText.split(/\s+/);
			var firstName = parts[0];
			var lastName = parts[1];

			var profiles = [
				{
					"firstName": firstName,
					"lastName": lastName,
					"proffesion": "IT-architect"
				},
				{
					"firstName": firstName+" 2",
					"lastName": lastName+" 2",
					"proffesion": "Developer"
				}
			];
			callback(profiles)
		},

		loadToken: function(){
		}
	}
});