var socket 

$(function() {
	socket = io.connect();
	socket.emit('load');
	
	socket.on('infos', function (data) { 
		console.log(data)
		if(data.team_infos){
			console.log(data.team_infos.icon.image_original)
			$("#team").append('<img src="'+data.team_infos.icon.image_44+'" >');

			$("#team").append('<h1>'+data.team_infos.domain+'</h1>');

		}
		if(data.team_channels){
			_.each(data.team_channels, function(c){
					var c_box = '<div class="channel-box" id="channel-'+c.id+'"><h2>'+c.name+'</h2><ul></ul></div>'
					$("#channels").append(c_box);
			})	
		}
	})
	socket.on('message', function (data) { 
		console.log(data.message)
		if(data.message.text){
			// data.from
			var li = '<li><strong>'+data.from+'</strong>'+data.message.text+'</li>'
			$('#channel-'+data.message.channel+' ul').append(li)
			//	$("#messages ul").append('');
		}
	})
});



