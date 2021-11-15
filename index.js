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
  console.log("new connection");
  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('disconnected');
  })
  socket.on('new post', (data) => {
    console.log('message: ' + data);
    fs.appendFile('./public/log/log.txt', data, function (err) {
      if (err) {
        console.log('There has been an error saving your configuration data.');
        console.log(err.message);
        return;
        }
      });
    }
  )
});

