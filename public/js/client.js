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

//$(function() {
  const socket = io();

  const sendBtn = document.querySelector('#sendButton');
  const $msgText = document.querySelector('#msgBox');
  const $username = document.querySelector('#username');
  let date = undefined;
  let username = undefined;

  sendBtn.onclick = ((e) =>{
    e.preventDefault();

    if ($msgText.value !== ''){
      date = getTime();
      if ($username.value !== ''){
        username = $username.value;
      } else {
        username = "аноним";
      }

      $username.setAttribute("readonly", "true");
      $username.setAttribute("placeholder", $username.value);

      socket.emit('new post', { user: username, msg: $msgText.value, date: date } );
      $msgText.value = '';
    }
  });

  socket.on('post', (data) => {
    console.log(JSON.stringify(data));
    const addpost = document.querySelector('#addPost')
    const newDiv = document.createElement('div');
    newDiv.className = 'right';

    newDiv.innerHTML = "<p>" + data.date + "</br> <b>" + data.user +
      "</b> оставил(а) сообщение: </br>"  + data.msg.replace(/(?:\r\n|\r|\n)/g, '<br>');
    document.body.insertBefore(newDiv, addpost);
  });
//})

