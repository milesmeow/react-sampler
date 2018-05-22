// --------------- 3rd party modules ---------------

const app = require('express')();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');

const server = http.createServer(app);
const jsonParser = bodyParser.json();

// const conString = 'postgres://nipjwpye:_UpXKJTMZQhtyiV4l-9AJa1ME8oi3xy2@nutty-custard-apple.db.elephantsql.com:5432/nipjwpye';
// const client = new pg.Client(conString);

// --------------- local imports ---------------

const userController = require('./controllers/userController.js');
const database = require('./database.js');

// local variables ---------------
const port = process.env.PORT || 3001;

// --------------- routers ---------------

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/', (req, res) => {
  // res.send('hello world!');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  // res.send('hello world!');
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});

app.post('/user', jsonParser, userController.createUser);

database.connect((err) => {
  if (err) console.log(`err: ${err}`);
  else console.log('connected to db');
});

server.listen(port, () => {
  console.log(`listening on PORT:${port}…`);
});

