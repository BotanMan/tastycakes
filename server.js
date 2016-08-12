var express = require('express'),
	http = require('http'),
    app = express(),
	server  = http.createServer( app );

app.use(express.static('public'));

server.listen(3000, function() {
      console.log('Express server listening on port %d.', server.address().port);
});