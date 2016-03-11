var RtmClient = require('@slack/client').RtmClient;


var express = require('express'),
nconf = require('nconf'), 
http = require('http'),  
chalk = require('chalk'),
_ = require('underscore');



var team_channels = []
var team_infos = {}

nconf.argv().env().file({file:'config.json'});


var back_channel = nconf.get('slack_back_channel_tom')
var app = express();
app.set('port', 8886);
app.use(express.static(__dirname + '/client/public'))

var server =  http.createServer(app);
server.listen(app.get('port'), function(){


/*   
  // Listening
  try {
    console.log('Old User ID: ' + process.getuid() + ', Old Group ID: ' + process.getgid());
    process.setgid('everyone');
    process.setuid('everyone');
    console.log('New User ID: ' + process.getuid() + ', New Group ID: ' + process.getgid());
  } catch (err) {
    console.log('Cowardly refusing to keep the process alive as root.');
    process.exit(1);
  }
*/
console.log('running')
    });


var token = process.env.SLACK_API_TOKEN || nconf.get('slack_token_tom');


var rtm = new RtmClient(token, {logLevel: 'debusg'});
rtm.start();

// https://slack.com/api/channels.list


var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;



var RTM_EVENTS = require('@slack/client').RTM_EVENTS;


rtm.on(RTM_EVENTS.PIN_ADDED, function (p) {
console.log('pin')
console.log(p)



 _.each(team_channels, function(tc){
       _.each(tc.messages, function(m){

                    console.log(m.ts+' '+p.item.message.ts)

                  if(m.ts == p.item.message.ts){
                    m.pin = true;
                  }
       
       })
 })





});

rtm.on(RTM_CLIENT_EVENTS.AUTHENTICATED, function (rtmStartData) {
console.log(rtmStartData.team.domain)
console.log('----')
team_channels = rtmStartData.channels


 _.each(team_channels, function(c){
  c.messages = []
 })
team_infos    = rtmStartData.team
console.log(rtmStartData.channels)

});


rtm.on(RTM_EVENTS.REACTION_ADDED, function (d) {

  console.log(d)


   _.each(team_channels, function(c){

                  if(d.item.channel == c.id ){
                    //// not this way c.messages.push(d)

                      console.log('reac')

                 //  console.log(c)
                 }
              })




})

rtm.on(RTM_EVENTS.MESSAGE, function (message, socket) {

console.log(message)


 _.each(team_channels, function(c){

                  if(message.channel == c.id && message.subtype  !=='pinned_item'){
                     c.messages.push(message)

                      console.log('chan push '+message.channel +'//'+ c.id)

                 //  console.log(c)
                 }
              })




if(team_infos.domain ){

    if(message.text == team_infos.domain+' top'){
       rtm.sendMessage('getting top listing ... for user _'+message.user+'_', back_channel, function messageSent() {
        console.log('send')
        // optionally, you can supply a callback to execute once the message has been sent
      });

    }


     if(message.text == team_infos.domain+' last'){
       rtm.sendMessage('getting last listing ... for user _'+message.user+'_', back_channel, function messageSent() {
        console.log('send')
        // optionally, you can supply a callback to execute once the message has been sent
      });

    }






}


if(message.text == 'morning' && message.user == 'U0QQUDWSF'){
    rtm.sendMessage('bonjour!  _'+message.user+'_', back_channel, function messageSent() {
    console.log('send')
// optionally, you can supply a callback to execute once the message has been sent
  });
}






  // Listens to all `message` events from the team
});

/*
rtm.on(RTM_EVENTS.MESSAGE, function (m) {
console.log('pirhn added')

});


*/


// var web = new WebClient(token);
/*
web.team.info(function teamInfoCb(err, info) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Team Info:', info);
  }
});
*/

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {



// console.log(rtm)





/*
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  rtm.sendMessage('this is a test message', 'D0R4EBRA7', function messageSent() {



  console.log('send')   
// optionally, you can supply a callback to execute once the message has been sent
  });
*/



/*
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  rtm.sendMessage('this is a test message', 'C0R4PE1AS', function messageSent() {

        console.log('send')
// optionally, you can supply a callback to execute once the message has been sent
  });
*/


});





  var io =  require('socket.io').listen(server, {log:false, origins:'*:*'}, function(){
    console.log(chalk.green('Hello io') );
  })


  io.on('connection', function (socket) {



   console.log(chalk.green('connection IO') );
   console.log('socket into server '+app.get('API_SERVER_PORT'))


    rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    console.log('message in added')


             

             var back = {now:new Date(), message: message, from:'Tom' }
            
             if(message.subtype !=='pin_added'){

             }
            socket.emit('message', back )  


              /* var t = setInterval(function(){
                    console.log('s+1')
              

                 }, 1000);

            */
    });


        socket.on('disconnect', function(){
               
       });

      socket.on('load', function(){
        var back = {now:new Date(), team_channels: team_channels, team_infos:team_infos }
        socket.emit('infos', back )  
      });
  

 

})



  app.get('/command', function(req, res){
    if(!req.query.text || req.query.text == ''){
          res.send('USAGE : /hacktuel last|post|hello');
    }else{
      res.send('T1:'+req.query.text);
    }
});

app.get('/', function(req, res){
  res.send('index.html');
});



exports = module.exports = app;

