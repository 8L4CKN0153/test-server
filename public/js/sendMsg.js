function sendMessage() {
  const newDiv = document.createElement('div');
  newDiv.className = 'right' ;

  const _date = getTime();

  const msgText = document.querySelector('#msgBox');
  const username = document.querySelector('#username');

  const divBefore = document.querySelector('#addPost');

  newDiv.innerHTML = "<p>" + _date + "</br> <b>" + username.value +
      "</b> оставил(а) сообщение: </br>"  + msgText.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
  document.body.insertBefore(newDiv, divBefore);

  const data = "\nDate: " + _date + "\nUser: " + username.value + "\nMessage: " + msgText.value + '\n\n';

  socket.emit('new post', data);

  msgText.value = "";
  username.value = "";
}

function getTime(){
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const mins = date.getMinutes();

  const _date = year + '/' + month + '/' + day + ' ' + hour + ':'+ mins + ' '; 
  return _date;
}


const socket = io();
const log = [];

const sendBtn = document.getElementById('sendButton');
sendBtn.onclick = sendMessage;