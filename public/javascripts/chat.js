

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
					//var message = _message_generator(data[i]['data']['sender'], _showEmoji(data[i]['data']['message']), data[i]['data']['timestamp'], false, false);
					var message = _message_generator_e('everyone', data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], true, 'visibility');
					
					$("#messages").append(message);
				}else {
					
					if (data[i]['data']['sender'] ==  sender ) { 
					    var message = _hitory_message_generator(data[i]['data']['receiver'] ,data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], true);
						//var message = _message_generator_e(data[i]['data']['sender'] ,data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], true, 'visibility');
					} else {
						var message = _hitory_message_generator(data[i]['data']['receiver'] ,data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], false);

					
					}
					/**
						if (data[i]['data']['receiver'] ==  sender ) { 
							if(data[i]['data']['read'] == true){
								//var message = _message_generator(data[i]['data']['sender'], _showEmoji(data[i]['data']['message']), data[i]['data']['timestamp'],true, true);} else{
								var message = _message_generator_e(data[i]['data']['sender'] ,data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], true, 'visibility');
								
							}
						}else {
								console.log(data[i]);
								var message = _message_generator_e(data[i]['data']['receiver'] ,data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], false, 'visibility');
							
							//var message = _hitory_message_generator(data[i]['data']['sender'],data[i]['data']['receiver'], _showEmoji(data[i]['data']['message']), data[i]['data']['timestamp'],true);
						}
						**/
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
				//var message = _message_generator(data.sender, _showEmoji(data.message), data.timestamp, false, false);
				
				var message = _message_generator_e('everyone', data.sender, data.message, data.timestamp, true, 'visibility');
				$("#messages").append(message);
				//$(".everyone").addClass("visibility");
				
				
				
				if(window.receiver == 'everyone') {
					$(".everyone").removeClass("visibility");
					
				}
				
			}

			
			if(data.receiver == sender) {
	
	
	
				//var message =   _message_generator(data.sender, _showEmoji(data.message), data.timestamp, true, false);
				
				
				/*8
				if(private && !local){
				msg = '<div class="message ' +  visibility + ' ' + sender  +'" read=false  ">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' + sender + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  message + '</p></div><div class="clear"></div></div>';
			}
			**/
				
				var message =   _message_generator_e(data.sender, data.sender, data.message, data.timestamp, false, 'visibility');	
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