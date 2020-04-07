var express = require('express');
var app = express();
var router = express.Router();
var server = app.listen(82);
//var http = require('http').createServer(app);
var io = require('socket.io').listen(server);

/*
router.get('/', function(req, res) { //fetch the html file
	res.render(__dirname + '/index.html');
});
*/

io.on('connection', function(socket) {
	
console.log("You are in");
socket.on('sendmsg', function(data) {
console.log(data);
var user = "" + socket.id;
io.emit('chat-message', user + ": " + data);
});

});

/*
http.listen(81, function() {
	console.log("Listening on port 81*");
})
*/
