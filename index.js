const fs = require('fs');
////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(911, '0.0.0.0', () => {
  console.log('listening on *:911');
});

const connections = [];

io.on('connection', (socket) => {
  connections.push(socket);
  console.log('new connection: ' + socket.handshake.address +' '+ socket.id);
  
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(socket.handshake.address + ' disconnected');
  })

  socket.on('new post', (data) => {
    console.log('message: ' + data.msg);
    io.emit('post', data);
    }
    
  )
});

