const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var users = {};

app.get('/', (req, res) => {
	res.sendFile(__dirname + '../client/index.html');
});

io.on('connection', (socket) => {
	let time = (new Date).toLocaleTimeString();

	socket.on('new user', (data, callback) => {
		if(data in users) {
			callback(false);
		} else {
			socket.nickname = data;
			users[socket.nickname] = socket;
			io.emit('new user', data);
			updateUsers();
			console.log(socket.nickname + ' joined in chat' + ' at ' + time);
		}
	});

	function updateUsers() {
		io.sockets.emit('usernames', Object.keys(users));
	};

	socket.on('chat message', (data, callback) => {
		io.sockets.emit('chat message', socket.nickname + ": " + data);
		console.log(socket.nickname + " at " + time);
	});

	socket.on('private message', (data) => {
		var name = data;
		users[name].emit('whisper', { msg: 'Hello World', nick: socket.nickname});
		console.log(name, socket.id);
	});

	socket.on('disconnect', (data) => {
		if(!socket.nickname) return;
		delete users[socket.nickname];
		updateUsers();
		console.log(socket.nickname + ' disconnect', " at " + time);
	});

	
});

http.listen(3001, () => {
  console.log('listening on * :3001');
});
