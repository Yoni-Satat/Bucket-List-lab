const express = require('express');
const server = express();

server.use(express.static('client/build'));


server.listen(3000, function() {
  console.log("Listening on port 3000...");
});
