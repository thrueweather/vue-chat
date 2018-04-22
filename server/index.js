const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(3001, () => {
  console.log('listening on * :3001');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '../client/index.html');
});

var users = [];

var rooms = ['room_1', 'room_2', 'room_3'];

io.on('connection', (socket) => {

	socket.on('new user', (data, callback) => {
		let time = (new Date).toLocaleTimeString();

		if(data in users) {
			callback(false);
		} else {
			socket.nickname = data;
			users[socket.nickname] = socket;
			io.emit('usernames',  socket.nickname + ' joined in chat a room_1');
			console.log(socket.nickname + ' joined in chat a room_1' + ' at ' + time);
		}
	});

	socket.on('chat message', (data) => {
		let time = (new Date).toLocaleTimeString();
		var msg = data.trim();
		if(msg.substring(0, 3) === '/p ') {
			msg = msg.substr(3);
			var i = msg.indexOf(' ');
			if (i !== -1) {
				var name = msg.substring(0, i);
				var msg = msg.substring(i + 1);
				if (name in users) {
					users[name].emit('private message',  socket.nickname + ": " + msg);
					console.log('@ private @ ' + socket.nickname + ": " + data + " at " + time)
				} else {alert('Enter a valid user')};
			} else {alert('Please enter a message for your friend ')};
		} 
		else {
			io.sockets.emit('chat message', socket.nickname + ": " + data);
			console.log(socket.nickname + ": " + data + " at " + time);
		}
	});

	socket.on('disconnect', (data) => {
		let time = (new Date).toLocaleTimeString();
		if(!socket.nickname) return;
		delete users[socket.nickname];
		io.emit('usernames', socket.nickname + ' disconnected in chat');
		console.log(socket.nickname + ' disconnect', " at " + time);
	});
});