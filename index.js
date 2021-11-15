const fs = require('fs');

fs.readFile('./public/log/log.json', "utf8", 
            function(error,data){
                console.log("Асинхронное чтение файла");
                if(error) throw error; // если возникла ошибка
                console.log(data);  // выводим считанные данные
});


////////////////////////
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

server.listen(911, () => {
  console.log('listening on *:911');
});

const _log = [];
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
    fs.appendFile('./public/log/log.json', JSON.stringify(data), 'utf8', function (err) {
      if (err) {
        console.log('There has been an error saving your configuration data.');
        console.log(err.message);
        return;
      }
    });
  });
});
