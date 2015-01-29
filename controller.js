module.exports = function(app, https, fs, json2csvConverter) {

	function callApi(options, payload, callback){
		var data = "";
		var apiReq = https.request(options, function(response) {
			response.on('data', function(d) {
				data += d;
			});
			response.on('end', function() {
				callback(data);
			});
			response.on('error', function(error) {
				process.stdout.write(error);
			});
		});
		if (payload) {
			apiReq.write(JSON.stringify(payload));
		}
		apiReq.end();
	}

	app.get("/people-search", function(req, res){
		var options = {
			host: "api.linkedin.com",
			path: "/v1/people-search?first-name="+req.query.firstName+"&last-name="+req.query.lastName,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization" : "Bearer "+req.query.token
			}
		};

		callApi(options, null, function(data){
			res.send(data);
		});
	});

	app.post("/access-token", function(req, res){
		var code = req.query.code;

		var options = {
			host: "www.linkedin.com",
			path: "/uas/oauth2/accessToken?" + 
				"grant_type=authorization_code"+
				"&code=" +code+
				"&redirect_uri=" +"http://127.0.0.1:3000/"+
				"&client_id=" +"75s8qsnoh8jt7w"+
				"&client_secret=" +"A98Kku16qYIEtzDd",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		};

		var data = "";
		// console.log("PATH: "+options.path);
		var apiReq = https.request(options, function(response) {
			response.on('data', function(d) {
				data += d;
			});
			response.on('end', function() {
				res.send(data);
			});
			response.on('error', function(error) {
				process.stdout.write(error);
			});
		});

		apiReq.end();
	});

	// Not used
	app.post("/generate-csv", function(req, res){
		json2csvConverter.json2csv(req.body, function(err, csv){
			if (err) throw err;
			var fileName = req.query.fileName+".csv";
			var path = "./public/tmp/"+fileName;
			fs.writeFile(path, csv, function(err) {
			    if(err) {
			        console.log(err);
			    } else {
			        console.log(fileName +" was saved!");
			        res.send(fileName);
			    }
			});
		}, {DELIMITER: {FIELD: ';'}});
	});
};

