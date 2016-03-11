var socket;
var app = angular.module('slackwall', ['ngResource','ngAnimate', 'ngSanitize'])
.controller('SlackwallCtrl', ['$window','$scope', '$http','$sce', '$location', '$timeout', function($window, $scope, $http, $sce,$location, $timeout) {


	$scope.team = {'messages':[]}
	socket = io.connect();
	socket.emit('load');
	
	socket.on('infos', function (data) { 

		$scope.team = data
		console.log($scope.team)
		if(data.team_channels){
			_.each($scope.team.team_channels, function(c){
var pattern1 = /</ig; // notice "g" here now!
var pattern2 = />/ig; // notice "g" here now!

			
				_.each(c.messages, function(m){
					
						if(m.text){

							m.text = m.text.replace(pattern1, "<a href='" ).replace(pattern2, "'>lien</a> " );

							console.log(m.text)


						}

				})

				
			})	
		}

		$scope.$apply()
	})
	socket.on('message', function (data) { 
		console.log(data.message)

		_.each($scope.team.team_channels, function(c){
						console.log(c)

				if(data.message.channel == c.id){




var pattern1 = /</ig; // notice "g" here now!

data.message.text.replace( pattern1, "" );


						c.messages.push(data.message)
				}

		})	


	

		

		$scope.$apply()
	})




		$scope.init = function(){ 
			

		}
		// init load game
		$scope.init()
}])