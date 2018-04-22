const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var users = [];

http.listen(3001, () => {
  console.log('listening on * :3001');
});

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
			io.emit('usernames');
			updateUsers();
			console.log(socket.nickname + ' joined in chat' + ' at ' + time);
		}
	});

	function updateUsers() {
		let user = Object.keys(users);
		io.sockets.emit('usernames', user.toLocaleString(), '<br>');
	};

	socket.on('chat message', (data, callback) => {
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
				}
				else {
					alert('Enter a valid user');
				}
			} 
			else {
				alert('Please enter a message for your friend ');
			}
		} 
		else {
			io.sockets.emit('chat message', socket.nickname + ": " + data);
			console.log(socket.nickname + ": " + data + " at " + time);
		}
	});

	// socket.on('private message', (data, msg) => {
	// 	var name = data;
	// 	users[name].emit('whisper', { name: socket.nickname + ": "+ 'This private message' });
	// 	console.log('whisper');
	// });

	socket.on('disconnect', (data) => {
		if(!socket.nickname) return;
		delete users[socket.nickname];
		updateUsers();
		console.log(socket.nickname + ' disconnect', " at " + time);
	});
});