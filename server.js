const express = require('express');
const parser = require('body-parser');
const server = express();

const MongoClient = require('mongodb').MongoClient;

server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));
server.use(parser.json());

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if(err) {
    console.log(err);
    return
  }

  server.get('/', function (req, res) {
    res.sendFile('index.html');
  })

  const db = client.db('bucket-list');
  console.log('connect to database');

  server.post('/countries', function(req, res) {
    db.collection('countries').insert(req.body, function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }
      console.log('Saved to database');
          res.status(201);
          res.json(result.ops[0]);
    });
  });

  server.get('/countries', function(req, res) {
    db.collection('countries').find().toArray(function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }
      res.json(result);
    });
  });

  server.delete('/countries', function(req, res) {
    db.collection('countries').remove({}, function(err, result) {
      if(err) {
        console.log(err);
        res.status(500);
        res.send();
        return;
      }

      res.status(204);
      res.send();
    });

  });


  server.listen(3000, function() {
    console.log("Listening on port 3000...");
  });
// END
});
