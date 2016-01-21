

$(document).ready(function (){
	
    var sender = $.cookie('user');
    window.receiver = 'everyone';
	var socket = io.connect('/', {reconnect: true});
	
	//var privateMessages = [];
	//var publicMessages = [];

	
	
	
	
	function simpleChat() {
    	return new simpleChat.prototype.init();
	};
	
  
	
	simpleChat.prototype = {
			
     init:function() {
		  this.socket = io.connect('/', {reconnect: true});
		  this.socket.emit('online', {'user': sender});
		  this.socket.on('online', function(data) {
			  if (data.user != sender) {
				  var sys = data.user + ' entered the room.';
				  
			  } else {
				  var sys = 'You entered the room';
			  }
		  	  $('#notification').html(sys);
			  _flushusers(data.users, data.offline);
			  _privateMessage(sender);
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
				//privateMessages.push(data);
				//console.log(privateMessages);
				//var privateMessage = "<div id ='" + data.sender + "'>"  +   "</div>";
				//var message = _message_generator(data.sender, _showEmoji(data.message), avatar);
				//var str = "#" + data.sender;
				//$(str).append(message);
				//$("#messages").append(message);
				//console.log(privateMessage);
				//var message = _private_message_generator(data.sender, _showEmoji(data.message), avatar);
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
		
		
		this.socket.on('offline', function(data){
			
			var sys = data.user + ' left the room';
			$('#notification').html(sys);
			$('.nav-box[name="' + data.user + '"]' ).css('opacity','0.5');
				
			//_flushusers(data.users);
			
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
	
	
	
	
	//simpleChat.privateMessage();
	//var a = simpleChat.showEmoji("[emoji:3]hi[emoji:12]");
	//console.log(a);
	
			
	/**		
		$("#userlist > li").bind("click", function(){
			console.log('hi');
			 
    alert($(this).text());
		});
		**/
		
	
	
	
	
	
	
	
	/**
    socket.emit('online', {'user': sender});
    socket.on('online', function(data) {
		if (data.user != sender) {
			var sys = '<h1>' +  data.user + ' entered the room.</h1>';
		} else {
			var sys = '<h1> You entered the room.</h1>';
		}
		$('#messages').append(sys);
		flushusers(data.users);
    });
	
	
	
	socket.on('messages', function(data){
		if(data.receiver='everyone'){
			//var message = '<div class="message">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' + data.sender + '</span><span class="timestamp">'  + now() + '</span><p>'  +  data.message + '</p></div><div class="clear"></div></div>';
			var message = message_generator(data.sender, data.message);
			$("#messages").append(message);
		}
		
	});
	
	
	
	
	
	
	
	
		//random number generator 
	   function flushusers(users){
		$('#userlist').empty().append('<li class="nav-box selected-box"  name="everyone" onselectstart="return false"> <h2> ＃Default</h2></li>');
		
		
		
		for (var u in users){
			var i = Math.round(2 * Math.random());
			avatar =  '<img src="images/avatar_'+ i + '.jpg">';
			$('#userlist').append('<li name="' + u + '"  class="nav-box"  onselectstart="return false" >' + avatar + '<h3>' + u + '</h3></li>');
	
		}
		
		
		
		
			
		$('#userlist > li').dblclick(function() {
			if($(this).attr('name') != sender) {
				receiver = $(this).attr('name');
				$('#userlist > li').not($(this)).removeClass('selected-box');
				$(this).addClass('selected-box');
				console.log(receiver);
				//showSayTo();
			}
		
		});
		
	}
	
	function now() {
    var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
    return time;
	}
	
	function showSayTo() {
		$("#from").html(sender);
		$("#to").html(receiver == "all" ? "所有人" : receiver);
	}
	

	
	$('#input-content').bind('keydown', function(e){
			if (e.which === 13 && e.ctrlKey == true) {
				var msg = $('#input-content').html();
				if (!msg) {return;}
				if(receiver == "everyone") {
					var message = message_generator(sender, msg);
				    $("#messages").append(message);	
				}
				socket.emit('messages', {'sender': sender, 'receiver': receiver, 'message': msg});
				$("#input-content").empty().focus();
			}
			
	});
	
	
	
	$('#say').click(function() {
		var msg = $('#input_content').html();
		if (!msg) {return;}
		if (receiver == "everyone") {
			$("#contents").append('<div>你(' + now() + ')对 所有人 说：<br/>' + msg + '</div><br />');
		} else {
			$("#contents").append('<div style="color:#00f" >你(' + now() + ')对 ' + receiver + ' 说：<br/>' + msg + '</div><br />');
		}
		socket.emit('messages', {'sender': sender, 'receiver': receiver, 'message': msg});
		$("#input_content").empty().focus();
	});
	
	
	
	function message_generator(sender, message){
			var message = '<div class="message">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' + sender + '</span><span class="timestamp">'  + now() + '</span><p>'  +  message + '</p></div><div class="clear"></div></div>';
			return message;
	}
	
	**/
	
	
});