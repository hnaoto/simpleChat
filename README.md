# simpleChat
A simple chat room web application.  http://gentle-waters-23533.herokuapp.com/

##modules dependency
* express 4 
* socket.io 
* cookie-parser
* ejs
* mongoDB

##Functionality
* One could join the "default" chat room after entering username
* Username will be stored in the cookie, so user don't need to enter the username again(unless cookie is reset) 
* All the users will receive the message in the "default" room
* One could send prviate message to any other user. 
* One will get notification of private messages.
* If some user left the room (closed the tab), his avatar will gray out.
* All the users will receive system notifications like "XYZ entered the room", "XYZ left the room", "You are talking to XYZ", "Server is down" .
* Chat history
* Inline Emoji 
* Responsive design for mobile user

##TODO/ Coming Features
https://github.com/hnaoto/simpleChat/issues

##References 
N-Chat: https://github.com/nswbmw/N-chat 
Socket.io: https://github.com/socketio/socket.io

##PS
Lots of testings are helped by [@mnithya](https://github.com/mnithya). Big thanks =D
