const express = require('express');
const app = express();
const port = 5000;

app.use(express.static(__dirname + '/build')).listen(5000, () => {
  console.log('static server up on ' + port);
});
