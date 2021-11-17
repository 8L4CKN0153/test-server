
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//чтение данных
const fs = require('fs');
const { json } = require('express');
const fileContent = fs.readFileSync('log.json', 'utf8');
if (fileContent !== ""){
  var _log = JSON.parse(fileContent);
}


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(911, '0.0.0.0', () => {
  console.log('listening on *:911');
});

const connections = [];

io.on('connection', (socket) => {
  connections.push(socket);
  console.log('new connection: ' + socket.handshake.address);
  if (_log !== null) {
    socket.emit('load log', _log);
  }
  
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(socket.handshake.address + ' disconnected');
  });

  socket.on('new post', (data) => {
    console.log(data.user + ': ' + data.msg);
    io.emit('post', data);
    _log.posts.push(data);
    fs.writeFile('log.json', JSON.stringify(_log), () => {});
    });
});
