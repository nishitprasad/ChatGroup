$(function(){
	var socket = io.connect();
	var $pageBody = $('#page-body');
	var $messageForm = $('#messageForm');
	var $message = $('#message-input-text');
	var $chat = $('#message-log');
	var $messageArea = $('#messageArea')
	var $userFormArea = $('#username-section');
	var $userForm = $('#userForm');
	var $users = $('#users');
	var $username = $('#username-text');

	$messageForm.submit(function(e){
		e.preventDefault();
		socket.emit('send message', $message.val());
		$message.val('');
	});


	socket.on('new message', function(data){
		if(data.id==socket.io.engine.id){
			$chat.append("<div class='self-message animated fadeInUp'>" + data.msg + "</div>");
		} else {
			$chat.append("<div class='broadcast-message animated fadeInUp'><h4>"+data.user +"</h4>" + data.msg + "</div>");
		}
		$pageBody.animate({
			scrollTop: $pageBody.prop('scrollHeight')
		}, 300);
	});

	$userForm.submit(function(e){
		e.preventDefault();
		socket.emit('new user', $username.val(), function(data){
			if(data){
				$userFormArea.hide();
				$messageArea.show();
			}
		});
		$username.val('');
	});

	socket.on('get users', function(data){
		var html = '';
		for(i=0; i<data.length;i++){
			html += '<li class="list-group-item animated fadeIn">'+data[i]+'<i class="fa fa-circle" aria-hidden="true"></i></li>';
		}
		$users.html(html);
	});
});
