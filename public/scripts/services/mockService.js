app.factory('MockService', function () {

	var proffesions = [
		"IT-architect",
		"Developer",
		"Project leader",
		"Designer",
		"Hardware engineer"
	];

	var companies = [
		"IBM",
		"Company A",
		"Company B",
		"Company C",
		"Company D"
	];

	function makeId(){
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	function getRandomProfiles(firstName, lastName){
		var listLength = Math.floor((Math.random() * 4) + 1);
		var profiles = [];
		for (var i = listLength - 1; i >= 0; i--) {
			var randomProffesionIndex = Math.floor((Math.random() * 5));
			var randomCompanyIndex = Math.floor((Math.random() * 5));

			var profile = {
				"id": makeId(),
				"firstName": firstName + " "+ (i+1),
				"lastName": lastName + " "+ (i+1),
				"proffesion": proffesions[randomProffesionIndex],
				"company": companies[randomCompanyIndex]
			};
			profiles.push(profile);
		}
		return profiles;
	};

	return {
		searchProfile: function(searchText, callback){
			var parts = searchText.split(/\s+/);
			var firstName = parts[0];
			var lastName = parts[1];

			var profiles = getRandomProfiles(firstName, lastName);
			callback(profiles)
		},

		loadToken: function(){
		}
	}
});