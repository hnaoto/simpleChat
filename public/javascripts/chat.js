

$(document).ready(function (){
	
    var sender = $.cookie('user');
    //var socket = 
    window.receiver = 'everyone';
    window.pmn_history =  {};
	window.socket = io.connect();
	
	
	
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
			  $("#messages").scrollTop(200000000);
			  if (data.user != sender) {
				  var sys = data.user + ' entered the room.';
				  
			  } else {
				  var sys = 'You entered the room';
			  }
		  	  $('#notification').html(sys);
			  _flushusers(data.users);
			  _privateReceiver(sender, io.connect());
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
                //clean up the nested condistions 
				if(!data[i]['private']) {
					var message = _message_generator_e('everyone', data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], true, 'visibility');
					
					$("#messages").append(message);
				}else {		
					if (data[i]['data']['sender'] ==  sender ) { 
					    var message = _hitory_message_generator(data[i]['data']['receiver'] ,data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], true);

					} else {
                        
						var message = _hitory_message_generator(data[i]['data']['receiver'] ,data[i]['data']['sender'], data[i]['data']['message'], data[i]['data']['timestamp'], false);
                        
                        if(!data[i]['read']) {
                        if (jQuery.inArray(data[i]['data']['sender'], Object.keys(window.pmn_history)) == -1){
                            window.pmn_history[data[i]['data']['sender']] = 1;
                        }else{
                           window.pmn_history[data[i]['data']['sender']] += 1; 
                        }
					}
                    }
					$("#messages").append(message); 
                   
				}
			}
            console.log(window.pmn_history);
             _pmn(window.pmn_history);
           
             
            
            
					
			if(window.receiver == 'everyone') {
				$(".everyone").removeClass("visibility");
				$("#messages").scrollTop(200000000);
	
			}
            
            
            
		});
		
		
		this.socket.on('messages', function(data){
			
			if(data.receiver == 'everyone') { 
                
				var message = _message_generator_e('everyone', data.sender, data.message, data.timestamp, true, 'visibility');
				$("#messages").append(message);
				
				if(window.receiver == 'everyone') {
					$(".everyone").removeClass("visibility");
					
				}
				
			}

			
			if(data.receiver == sender) {
				
				var message =   _message_generator_e(data.sender, data.sender, data.message, data.timestamp, false, 'visibility');	
				$("#messages").append(message);
				var count = $('.message.' + data.sender +  '[read=false]').length ;
                if (data.sender in window.pmn_history){
                    count += window.pmn_history[data.sender];
                }
				$('.nav-box[name=' + data.sender + ']').find('.pmn').html(count).removeClass('visibility');
				


				if(window.receiver == data.sender) {
					$('.' + window.receiver).removeClass('visibility').attr('read', true);
					$('.nav-box[name=' + data.sender + ']').find('.pmn').addClass('visibility');
                    window.socket.emit('update',  {sender: window.receiver});
                    window.pmn_history[window.receiver] = 0; 
                    $("#messages").scrollTop(200000000);
				}
				
                 
				
			}
						
				//$("#messages").scrollTop(200000000);

		});
	
	
		 _submitMessageEvent(sender, window.receiver, this.socket);
		  
		  return this;
	 }
		
		


}
		
	
	
	
	simpleChat.prototype.init.prototype=simpleChat.prototype;
    var simpleChat = new simpleChat();
	
	
	
	
	
	
	
});