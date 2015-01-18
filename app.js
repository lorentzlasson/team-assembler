var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var converter = require('coordinator'),
utmToLatLong = converter('utm', 'latlong');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); //setup static public directory

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

app.post("/accessToken", function(req, res){
	var code = req.query.code;

	var options = {
		host: "linkedin.com",
		path: "/uas/oauth2/accessToken" + "grant_type=authorization_code"+
		"&code=" +code+
		"&redirect_uri=" +"http://127.0.0.1:3000"+
		"&client_id=" +"752qtw90g4zrsy"+
		"&client_secret=" +"eMRsWQE28M6KEn7m",
		method: "POST",
		headers: {
			"Accept": "*/*",
			"Content-Type": "application/json"
		}
	};

	var data = "";
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
})

var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);

app.listen(port, host);
console.log('App started on port ' + port);
