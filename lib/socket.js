



exports.main = function(io, users) {
	io.on('connection', function(socket){
	//users
	socket.on('online', function(data){
		var user = data.user;
		socket.name = data.user;
		if (!users[data.user]){
			users[data.user] = data.user;
		}
		io.sockets.emit('online', {users: users, user: data.user});
		
		
		
		
	
	});
	//messages
	socket.on('messages', function(data) {
		if(data.receiver == 'everyone'){
			console.log(data);
			
			socket.broadcast.emit('messages', data);
			
		}else{
			var clients = io.sockets.sockets.map(function(e) {return e.name});
			  
			for (var i = 0; i < clients.length; i++) {
				if(clients[i] == data.receiver) io.sockets.emit('messages', data);

			}
			
			
		}
	
	});
	
	
	
	
	socket.on('disconnect', function() {
		if(users[socket.name]) {
			//delete users[socket.name];
			socket.broadcast.emit("offline", {users: users, user: socket.name});
		}
	});


});






}