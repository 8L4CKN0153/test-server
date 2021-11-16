function saveToLog(fs, data){
  const posts = JSON.parse('log/log.json');
  posts.push(data);
  data = JSON.stringify(posts);
  fs.appendFile('log/log.json', data, function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
      }
    });
}
//не работает нужен файл
function readFromLog () {
  const posts = JSON.parse('log/log.json')
  
}