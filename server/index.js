const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var users = {};
app.get('/', (req, res) => {
	res.sendFile(__dirname + '../client/index.html');
});

io.on('connection', (socket) => {
	let time = (new Date).toLocaleTimeString();

	socket.on('username', (user) => {
		io.emit('username', user);
		socket.nickname = user;
		users[socket.nickname] = socket;
		console.log(user + ' joined in chat' + ' at ' + time);
	});

	socket.on('chat message', (message) => {
		io.emit('chat message', message);
		console.log(message + " at " + time);
	});

	socket.on('disconnect', (user) => {
		// add disconnect user !!!!
		console.log('disconnect', " at " + time);
	});

	
});

http.listen(3001, () => {
  console.log('listening on * :3001');
});
