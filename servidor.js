var debug = require('debug')('my-application'),
	config  = require('./config'),
	app = require('./app')(config),
	http = require('http');

var server = http.createServer(app).listen(config.port, function(){
	console.log('Puerto: ' + server.address().port);
});