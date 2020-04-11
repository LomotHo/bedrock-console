const path = require('path');
const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server);
const readline = require('readline');
const static = require('koa-static');

// module
const config = require('./config');
const log = require('./util/log');
const action = require("./action");
const rest = require("./util/rest");
const controller = require('./controller');
// global var
global.config = config;
global.log = log;


var clientsocket = "";

// lauch BDS
const BDS = new action.bds();
global.BDS = BDS;
var bdsProcess = BDS.getProcess();


// static files, Vue view
const home = static(path.join(__dirname)+'/public/');
app.use(home);

// restful api
app.use(rest.restify(config.apiPrefix));
app.use(controller(path.resolve(__dirname, './controller')));

// websocket
io.on('connection', function(socket) {
	clientsocket = socket.id;
	log.info(`[WS] client ${clientsocket} connected`);
	io.sockets.connected[clientsocket].emit("log",`welcome ${clientsocket}`);
	socket.on('cmd', function(msg) {
		log.info(`[WS] client# ${msg.cmd}`);
		// bdsProcess.stdin.write(msg.cmd+'\n');
		BDS.writeCmd(msg.cmd);
	});
	socket.on('disconnect', function() {
		log.info('[WS] ws client Disconnected');
		clientsocket = "";
		// authenticated = false;
		// client_token = "";
	});
})


function bdsLog(data) {
	// BDS 日志按行分割, 去除尾部'\n'
	let lines = data.toString().split("\n").splice(this.length-1, 1);
	lines.map(line => {
		log.info(`[BDS] ${line}`);
	})

	if(clientsocket!='') {
		try {
			io.sockets.connected[clientsocket].emit('log', data.toString());
		} catch (error) {
			log.error("emit error: ws client offline");
		}
	}
}


bdsProcess.stdout.on('data', bdsLog);
bdsProcess.stderr.on('data', bdsLog);

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// rl.on('line', function (cmd) {
//   if (cmd=="logout"){
//   	io.sockets.connected[clientsocket].emit('chat message', "Your session has been killed");
// 	clientsocket = "";
// 	authenticated = false;
// 	client_token = "";
//   }
// });



server.listen(config.localPort, function(){
	log.info(`listening on *:${config.localPort}`);
});


// //Clear console
// console.log('\033[2J');

// //Create a random token
// var rand = function() {
//   return Math.random().toString(36).substr(2); // remove `0.`
// };

// var token = function() {
//   return rand() + rand(); // to make it longer
// };


// //Start the minecraft server
// var spawn = require('child_process').spawn,
// bdsProcess = spawn('./bedrock_server', [], {cwd: './bedrock'});


// //Client connects
// io.on('connection', function(socket){

// 	//Only if no user is logged in
// 	if (authenticated!=true){
// 		clientsocket = socket.id;
// 		client_token = token();
// 		console.log("Client Token: "+client_token);
	

// 		//Send client "Please login text" and send user token to send password to correct room
// 		io.sockets.connected[clientsocket].emit("chat message","Please Login");
// 		io.sockets.connected[clientsocket].emit("token",client_token);
// 	}else{
// 		io.sockets.connected[socket.id].emit("chat message","Other user is already logged in");
// 	}
// 	var socketid = clientsocket;
// 	io.sockets.connected[clientsocket].on(client_token, function(data){
// 		if (socketid==clientsocket){
// 			console.log("User "+clientsocket +" logged in with password: "+ data);
// 			if (data==password){
// 				console.log("User "+clientsocket +" logged in");
// 				authenticated = true;

// 				//Notify Client that user has successfully logged in
// 				io.sockets.connected[clientsocket].emit("chat message","Logged In");
// 				io.sockets.connected[clientsocket].emit(client_token,"1");

// 				//Client is logged in so accept incoming commands
// 				io.sockets.connected[clientsocket].on('chat message', function(msg){
// 					if (authenticated){
// 						bdsProcess.stdin.write(msg+'\n');
// 					}

// 				});
// 				socket.on('disconnect', function(){
// 					console.log('User Disconnected');
// 					clientsocket = "";
// 					authenticated = false;
// 					client_token = "";
// 	    		});
// 			}else{

// 				//Notify Client that password was incorrect
// 				console.log("User "+clientsocket +" used incorrect password");
// 				io.sockets.connected[clientsocket].emit("chat message","Incorrect Password");
// 			}
// 		}
// 	});
// });

// function log(data) {

// 	//If authenticated send console output to Client
// 	if (authenticated==true){
// 		io.sockets.connected[clientsocket].emit('chat message', data.toString());
// 	}
// }
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.on('line', function (cmd) {
//   if (cmd=="logout"){
//   	io.sockets.connected[clientsocket].emit('chat message', "Your session has been killed");
// 	clientsocket = "";
// 	authenticated = false;
// 	client_token = "";
//   }
// });

// bdsProcess.stdout.on('data', log);
// bdsProcess.stderr.on('data', log);

// server.listen(config.localPort, function(){
//   console.log(`listening on *:${config.localPort}`);
// });
