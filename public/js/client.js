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

$(function() {
  const socket = io();
  const sendBtn = $('#sendButton').get(0);
  const $msgText = $('#msgBox').get(0);
  const $username = $('#username').get(0);
  const $addPost = $('#addPost').get(0);
  
  let date = '';
  let username = '';

  const sound = new Audio('../content/sound.mp3');
  sound.volume = 0.6;

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
    sound.play();
    console.log(JSON.stringify(data));
    const newDiv = document.createElement('div');
    newDiv.className = 'right';

    newDiv.innerHTML = "<p>" + data.date + "</br> <b>" + data.user +
      "</b> оставил(а) сообщение: </br>"  + data.msg.replace(/(?:\r\n|\r|\n)/g, '<br>');
    document.body.insertBefore(newDiv, $addPost);
    });
    

  socket.on('load log', (log) => {
    console.log(log.posts);
    console.log(log.posts[0]);
    console.log(log.posts[1]);

    for(var i=0; i < log.posts.length; i++){
      const newDiv = document.createElement('div');
      newDiv.className = 'right';

      newDiv.innerHTML = "<p>" + log.posts[i].date + "</br> <b>" + log.posts[i].user +
       "</b> оставил(а) сообщение: </br>" + log.posts[i].msg.replace(/(?:\r\n|\r|\n)/g, '<br>');
      document.body.insertBefore(newDiv, $addPost);
    }
  });
})
