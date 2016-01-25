

$(document).ready(function (){
	
    var sender = $.cookie('user');
    window.receiver = 'everyone';
	//var socket = io.connect();
	
	
	
	function simpleChat() {
    	return new simpleChat.prototype.init();
	};
	
  
	
	simpleChat.prototype = {

     init:function() {
		 _initialMobileMenu();
		 _initialEmoji();
		 _initialMenu();
		  
		  
		  this.socket = io.connect();
		  this.socket.emit('online',  {user: sender});
		  this.socket.emit('history', {user: sender});
		  this.socket.on('online', function(data) {
			  if (data.user != sender) {
				  var sys = data.user + ' entered the room.';
				  
			  } else {
				  var sys = 'You entered the room';
			  }
		  	  $('#notification').html(sys);
			  _flushusers(data.users);
			  _privateReceiver(sender);
    	  });
		   
		  
		  	
		
		this.socket.on('offline', function(data){
			
			var sys = data.user + ' left the room';
			$('#notification').html(sys);
			$('.nav-box[name="' + data.user + '"]' ).css('opacity','0.5');
				
			//_flushusers(data.users);
			
		});
		
		
		this.socket.on('disconnect', function() {
			var sys = 'server is down';
			$('#notification').html(sys);
			$('#userlist').css('opacity', '0.5');
		});


		this.socket.on('reconnect', function() {
			var socket = io.connect();
  			socket.emit('online', {user: sender});
			
		});
		
		
		
		   
		   
		   
		 
		
		this.socket.on('history', function(data){
		
			console.log(data);

			
			$("#messages").find('.message').remove();
			for (var i = 0; i < data.length; i++) {
				if(!data[i]['private']) {
					var message = _message_generator(data[i]['data']['sender'], _showEmoji(data[i]['data']['message']), false, false);
					$("#messages").append(message);
				}else {
					
						if (data[i]['data']['receiver'] ==  sender ) { 
							var message = _message_generator(data[i]['data']['sender'], _showEmoji(data[i]['data']['message']), true, false);  
						}else {
							var message = _hitory_message_generator(data[i]['data']['sender'],data[i]['data']['receiver'], _showEmoji(data[i]['data']['message']), true);
						}
					$("#messages").append(message); 
				}
			}
			
			  
					
				if(window.receiver == 'everyone') {
					$(".everyone").removeClass("visibility");
					$("#messages").scrollTop($('#messages').height());	
				}
				
				
	
			
		});
		
		
		this.socket.on('messages', function(data){
			
			if(data.receiver == 'everyone') { 
				var message = _message_generator(data.sender, _showEmoji(data.message), false, false);
				$("#messages").append(message);
				//$(".everyone").addClass("visibility");
				
				
				if(window.receiver == 'everyone') {
					$(".everyone").removeClass("visibility");
				}
				
			}

			
			if(data.receiver == sender) {
	
				var message =   _message_generator(data.sender, _showEmoji(data.message), true, false);
				$("#messages").append(message);
				
				
				
				var count = $('.message.' + data.sender +  '[read=false]').length;
				$('.nav-box[name=' + data.sender + ']').find('.pmn').html(count).removeClass('visibility');
				
				
				
				
				if(window.receiver == data.sender) {
					$('.' + window.receiver).removeClass('visibility').attr('read', true);
					$('.nav-box[name=' + data.sender + ']').find('.pmn').addClass('visibility');
				}
				
				
			}
						
			$("#messages").scrollTop($("#messages").height());
		});
	
	
		 _submitMessageEvent(sender, window.receiver, this.socket);
		  
		  return this;
	 }
		
		


}
		
	
	
	
	simpleChat.prototype.init.prototype=simpleChat.prototype;
    var simpleChat = new simpleChat();
	
	
	
	
	
	
	
});