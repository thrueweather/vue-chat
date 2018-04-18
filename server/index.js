const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '../client/dist/');
});

io.on('connection', (socket) => {
	// let name = (socket.id).toString().substr(1,4);
	// console.log(name + " connection" + " at " + time);
	let time = (new Date).toLocaleTimeString();
	// Join user
	socket.on('username', (user) => {
		io.emit('username', user);
		console.log(user + ' joined in chat' + ' at ' + time);
	});
	// Send message
	socket.on('chat message', (message) => {
		io.emit('chat message', message);
		console.log(message + " at " + time);
	});
	// Disconnect
	socket.on('disconnect', (user) => {
		// add disconnect user !!!!
		console.log('disconnect', " at " + time);
	});
	socket.on('say to someone', (id, msg) => {
    // send a private message to the socket with the given id
    socket.to(id).emit('my message', msg);
  });
});

http.listen(3001, () => {
  console.log('listening on * :3001');
});
