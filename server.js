const express = require('express');
const parser = require('body-parser');
const server = express();

const MongoClient = require('mongodb').MongoClient;

server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));
server.use(parser.json());

server.get('/countries', function(req, res) {
  console.log(req.body);
});

server.post('/countries', function(req, res) {
  res.status(201);
  res.json({name: "hi"});
});


server.listen(3000, function() {
  console.log("Listening on port 3000...");
});
