# Slack APIs+socketIO



## WHAT

a web-interface for slack team (messages, links, channel)

## LOGIC

BOT (slack)  <---> RTM API (node module)
									<----> nodeJS server (express)
													|
													|
											    memory storage (No database storage) 
														|
														|
													socket.io 	-----> express+angular page 
																				|
																   socket <-----|
												 
## INSTALL

git clone https://github.com/hacktuel/slackwall.git

cp config_sample.json config.json 
nano config.json (edit your token value)

npm install

node index.js

open http://localhost:7143 || config.PORT


##USE

RTM Connection

socket stream

/command



## Todos and bugs report :


Add event type
add display


Using (https://github.com/tomplays/MusicBox/issues?state=open) open issues

## Versions
  
  0.1 : 

  


## AUTHOR

Tom Wersinger <homeof@gmail.com>

## COPYRIGHT

Copyright (C) 2016 Tom Wersinger <homeof@gmail.com>

## LICENSE

MIT License

See [LICENSE](https://github.com/hacktuel/slackwall/blob/master/LICENSE.md)

#### DISCLAIMER


