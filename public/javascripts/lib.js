
  function  _initialMenu() {
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
 
 
 
 
 	 function _initialEmoji() {
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
			
			if (nodeName === "img"){
			 	$("#input-content input").focus();
			 	$("#input-content input").val( $("#input-content input").val() + "[emoji:" + e.target.title + "]");
				$("#emoji-wrapper").css("display","none");
			}
		});
		
		
	}
	

 
 
 
   function _initialMobileMenu(){
	   	$('#mobile-menu, nav').bind('click', function(e) {
			
			$('nav').toggleClass('showing');
			$('nav ul').toggleClass('showing2');
		});
   }
 
 
   function _flushusers(users){
		$('#userlist').empty().append('<li class="nav-box"  name="everyone" onselectstart="return false"> <h2> ＃Default</h2></li>');
		$('#userlist').css('opacity', '1');


		
		//merge these two group
		

	
		$.each(users, function(key, value) {
			avatar =  '<img src="images/avatar_'+ _stringHash(key)+ '.jpg">';
			$('#userlist').append('<li name="' + key + '"  class="nav-box"  >' + avatar + '<h3>' + key + '</h3><span class="pmn visibility"> 0</span></li>');
			
			if(!value['online']){
				$('.nav-box[name=' + key +  ']').css('opacity','0.5');
			}
		});
		
	
		
	
		$(".nav-box[name='" + window.receiver + "']").addClass('selected-box');
		
   }
      
   
   
   
   
   function _message_generator_e(className, displayName, message, timestamp, read, visibility ){
	    var avatar =  '<img src="images/avatar_'+ _stringHash(displayName) + '.jpg">';
	    var msg = '<div class="message ' +  visibility + ' ' + className  +'" read="' +  read  +   '">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' + displayName + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  _showEmoji(message) + '</p></div><div class="clear"></div></div>';
		return msg;
   }
   
   
   
     /**
   	//clean this function
	function _message_generator(sender, message,timestamp, private, local, visibility){
		    var avatar =  '<img src="images/avatar_'+ _stringHash(sender) + '.jpg">';
			var msg = '';

		
			//rewrite as swtich
			if(private && !local){
				msg = '<div class="message ' +  visibility + ' ' + sender  +'" read=false  ">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' + sender + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  message + '</p></div><div class="clear"></div></div>';
			}
			
			
			if(private && local) {
				msg = '<div class="message ' + window.receiver  +'" read=true ">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' + sender + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  message + '</p></div><div class="clear"></div></div>';
			}
			
			
			if(!private && local ){
				msg = '<div class="message everyone ">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' + sender + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  message + '</p></div><div class="clear"></div></div>';
				
			}
			
		
		
				
			if(!private && !local){
				msg = '<div class="message everyone visibility">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' + sender + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  message + '</p></div><div class="clear"></div></div>';
			}	
			
			
			return msg;
	}
	 **/
	
	function _hitory_message_generator(className, displayName, message, timestamp, local) {
		var avatar =  '<img src="images/avatar_'+ _stringHash(displayName) + '.jpg">';
		
		
		/**
		if(local){
			msg = '<div class="message visibility ' +  className  +'" read=true ">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' +   displayName + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  _showEmoji(message) + '</p></div><div class="clear"></div></div>';
		}else{
			msg = '<div class="message visibility ' +  displayName  +'" read=true ">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' +   displayName + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  _showEmoji(message) + '</p></div><div class="clear"></div></div>';			
		}
		
		**/
		
		var name1 = className;
		var name2 = displayName;
		if(!local){
			name1 = displayName;
		}
		
		var msg = '<div class="message visibility ' +  name1  +'" read=true ">  <div class="avatar">'+ avatar + '</div> <div class="content"><span class= "name">' +   name2 + '</span><span class="timestamp">'  + timestamp + '</span><p>'  +  _showEmoji(message) + '</p></div><div class="clear"></div></div>';
		
		return msg;
		
	}
	
	
	
	function _now() {
    	var date = new Date();
    	var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
    	return time;
	}
	
	
	
	
	
	
	function _showEmoji(msg){
		if(msg.indexOf("[emoji:") <= -1)  return msg;
		var matches = msg.match(/\[emoji:\d+\]/g);
		for (var i = 0; i <  matches.length; i++){
			var imgId = matches[i].slice(7, -1);
			if (imgId > 12) {
				msg =  msg.replace(matches[i], "" );
				break;
			}
		    msg =  msg.replace(matches[i], "<span><img src=images/emoji/0" +  imgId + ".gif ></span>" );
		}
		
		return msg;
	}
	
	
	function _stringHash(str){
		var sum = 0;
		for(var i = 0; i< str.length; i++){
			sum = sum + (str.charCodeAt(i)-70);	
		}
		
		var result = parseInt(sum/100) +  parseInt((sum % 100)/10) +  sum%10;
		return Math.round(result/3);
		 
		
	}
	
	function _privateReceiver(sender){
		
			$('#userlist > li').click(function() {
			if($(this).attr('name') != sender) {
				window.receiver = $(this).attr('name');
				$('#userlist > li').not($(this)).removeClass('selected-box');
				$(this).addClass('selected-box');
				$('#mobile-menu').find('h4').html(window.receiver);
				
				
				$(".message").addClass("visibility");
				
				var str = '.' + window.receiver;
				$(str).removeClass("visibility").attr('read', true);;
				$('.nav-box[name=' + window.receiver + ']').find('span.pmn').addClass('visibility');
				
				
				var sys = 'You are talking to ' + receiver ;
				$('#notification').html(sys);
				//$("#messages").scrollTop($("#messages").height());
				$("#messages").scrollTop(200000000);

				/**
				$('#messages').empty().append(sys);	
				
				for (var i = 0; i <  privateMessages.length; i++) {
					if ( privateMessages[i].sender == window.receiver) {
					var msg = _message_generator(privateMessages[i].sender, _showEmoji(privateMessages[i].message));
					$('#messages').append(msg);
					}
				}
				
				**/
				
				
			}
		});
		
	}
	
	
	
	function _submitMessageEvent(sender, receiver, socket){
			$("#input-content input").bind('keydown', function(e){
			if (e.which === 13 && e.ctrlKey == true || e.which === 13) {
				var msg = $(this).val();
				if (!msg) {return;}
				e.preventDefault();
				e.stopPropagation();
				//var msg = _showEmoji($(this).val());
				/**
				if(window.receiver == "everyone") {
					var message = _message_generator_e('everyone', sender, msg, _now(), true, "");
					
				    $("#messages").append(message);	
					
				} else{
					var message = _message_generator_e(window.receiver, sender, msg, _now(), true," ");
				    $("#messages").append(message);	
			
			
				}
			    **/	
				var message = _message_generator_e(window.receiver, sender, msg, _now(), true," ");
				$("#messages").append(message);	
				socket.emit('messages', {'sender': sender, 'receiver': window.receiver, 'message': msg, timestamp:_now()});
				$(this).val("").focus();
				$("#messages").scrollTop($("#messages").height());
			}
			
		});
		
		
	}