

var offlineUsers = {};
var db = require('./db');
exports.main = function(io, users) {
	io.on('connection', function(socket){
	//users
	socket.on('online', function(data){
		//var user = data.user;
		socket.name = data.user;
		if (!users[data.user]){
			users[data.user] = data.user;
		}
		if(
		offlineUsers[data.user]){
			delete offlineUsers[data.user];
		}
		
		io.sockets.emit('online', {users: users, user: data.user, offline: offlineUsers});
	
	});
	
	
	
	//messages
	socket.on('messages', function(data) {
		if(data.receiver == 'everyone'){
			console.log(data);
			
			socket.broadcast.emit('messages', data);
			
		} else {
		    var clients = Object.keys(io.sockets.sockets).map(function (k) { return io.sockets.sockets[k].name});
		    for (var i = 0; i < clients.length; i++) {
				if(clients[i] == data.receiver) io.sockets.emit('messages', data);

			}
			
			
		}
	
	});
	
	
	
	
	socket.on('disconnect', function() {
		if(users[socket.name]) {
		    delete users[socket.name];
		    offlineUsers[socket.name] = socket.name;
			socket.broadcast.emit("offline", {users: users, user: socket.name});
		}

	});


});






}