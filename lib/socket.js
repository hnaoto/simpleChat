

var db = require('./db');
exports.main = function(io, users) {
	io.on('connection', function socketHandler(socket){
	
	//var clients = Object.keys(io.engine.clients);
	var id = socket.id;
	
	
	/**
	//users
	if(Object.keys(users).length == 0){
		db.find({'user':1 },  function(data){
			for( var i = 0; i < data.length; i++){
				users[data[i]['user']] = {name: data[i]['user'], online: false};
			}
		});
	}
	**/
	
	
	
	socket.on('online', function(data){
		//var user = data.user;
		socket.name = data.user;
		if (!users[data.user]){
			users[data.user] = {name: data.user, online:true};
			//db.insert({user: socket.name});
		}else{
			users[data.user]['online'] = true;
		}
		
		io.sockets.emit('online', {users: users, user: data.user});
	
	});
	
	
	
	//history messages
	socket.on('history', function(data){
		var name = data.user;
		db.find({ $or:[{'data.sender': name, 'private': true}, {'data.receiver': name, 'private': true}, {'data.receiver': 'everyone'}]}, function(data){
		
			 io.sockets.connected[id].emit('history', data);
		});
		
	});
	
	
	//messages
	socket.on('messages', function(data) {
		if(data.receiver == 'everyone'){
			//console.log(data);
			socket.broadcast.emit('messages', data);
			db.insert({data, read: true, private: false});
			db.insert({data, read: true, private: false});
		} else {
		
			
		    var clients = Object.keys(io.sockets.sockets).map(function (k) { return io.sockets.sockets[k].name});
			
			
			if (users[data.receiver]['online']) {
				for (var i = 0; i < clients.length; i++) {
					if(clients[i] == data.receiver) {
						io.sockets.emit('messages', data);
						//io.sockets.connected[id].emit('messages', data);
						db.insert({data, read: true,  private: true});
					}
				}
			}else{
				db.insert({data, read: false, private: true});
			}
		}
	
	
	});
	
	
	
	//offline
	socket.on('disconnect', function() {
		if(users[socket.name]) {
		    //delete users[socket.name];
			users[socket.name]['online'] = false;
			socket.broadcast.emit("offline", {users: users, user: socket.name});
		}

	});


});






}