var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var db = require('./lib/db');
//var mongodb = require('mongodb');
//var mongoServer = new mongodb.Server('127.0.0.1', 27017, {});
//var mongoClient = new mongodb.Db('simpleChat', mongoServer, {w :1})
//var users = require('./routes/users');


var app = express();


app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'));
var io = require('socket.io')(server);
var socketUtility = require('./lib/socket');
var currentRoom = {};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers




// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





//socket.io


var users = {};
socketUtility.main(io ,users);

//db.add({message:"hi"});


/**
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


}); 
**/



app.set('users_accounts', users);



function joinRoom(socket, room) {
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.emit('joinResult',{room: room});
	


	

}

//module.exports = app;
