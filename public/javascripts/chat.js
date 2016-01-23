

$(document).ready(function (){
	
    var sender = $.cookie('user');
    window.receiver = 'everyone';
	//var socket = io.connect();
	
	
	
	function simpleChat() {
    	return new simpleChat.prototype.init();
	};
	
  
	
	simpleChat.prototype = {
			
     init:function() {
		  _mobileMenu();
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
			
			
			/**
			for (var i = 0; i < data['public'].length; i++) {
				var message = _message_generator(data['public'][i]['sender'], _showEmoji(data['public'][i]['message']), false, false);
				$("#messages").append(message);
			}
			**/
			
				
				if(window.receiver == 'everyone') {
					$(".everyone").removeClass("visibility");
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
			
			
			/**
			if(data.receiver == sender && window.receiver == data.sender) {
				 var message =   _message_generator(data.sender, _showEmoji(data.message), true, false);
				
				//_private_message_generator(data.sender, _showEmoji(data.message), avatar);
				$("#messages").append(message);
				var str = '.' + window.receiver;
				$(str).removeClass("visibility");
				
			} 
			**/
			
			
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
		
			
			
		});
	
		
		
		 _submitMessageEvent(sender, window.receiver, this.socket); 
		  return this;
	 },
		
		

	 initialEmoji: function() {
		var emojiWrapper = $("#emoji-wrapper");
		for (var i = 12; i > 0; i--) {
			var emoji = "<img src=images/emoji/0" + i +".gif" + " title=" + i + ">";
			emojiWrapper.append(emoji);
	  }
		
		
		
		$(document).bind("click",function(e){
			e.stopPropagation();
			var id = $(e.target).attr("id");
			if ( id == "input-emoji-button") {
				$("#emoji-wrapper").css("display", "block");
			}else{
				$("#emoji-wrapper").css("display", "none");
			}
			
		});
		
		
		
		

		$("#emoji-wrapper").bind("click", function(e){
			var nodeName = e.target.nodeName.toLowerCase();
			e.preventDefault();
			e.stopPropagation();
			
			if (nodeName === "img"){
			 	$("#input-content input").focus();
			 	$("#input-content input").val( $("#input-content input").val() + "[emoji:" + e.target.title + "]");
				$("#emoji-wrapper").css("display","none");
			}
		});
		
		
	}, 
	
	initialMenu: function() {
		$(document).bind("click",function(e){
			e.stopPropagation();
			var id = $(e.target).attr("id");
			if ( id == "input-button") {
				$("#input-menu").css("display", "block");
			}else{
				$("#input-menu").css("display", "none");
			}
			
		});
		
		
	}

}
		
	
	
	
	simpleChat.prototype.init.prototype=simpleChat.prototype;
	
    var simpleChat = new simpleChat();
	simpleChat.initialEmoji();
	simpleChat.initialMenu();
	
	
	
	
	
	
});