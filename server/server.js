const app = require('express')();
const cors = require('cors');
const { application } = require('express');
const path = require('path');
const url = require('url');
const { v4: uuid } = require('uuid');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 8000;
app.use(cors());

const clientToRespond = {};

//can use this for making multiple server live here
//i have taken only for two server.
app.get('/server1/*', (req, res) => {
 const clientId = uuid();
 let pathName = url.parse(req.url).pathname.split('/');
 pathName.splice(1, 1);
 pathName = pathName.join('/');

 //this object will passed to the client on you local host
 const clientObject = {
  pathName,
  server: 'server1',
  method: 'get',
  body: req.body,
  params: req.query,
  clientId,
 };

 io.emit('new-request', clientObject);

 //storing client response object so when io get response from
 //server running on local machine then we can direct it to the client
 //requested for it.
 clientToRespond[clientId] = res;
 return;
});

app.post('/server1/*', (req, res) => {
 const clientId = uuid();
 let pathName = url.parse(req.url).pathname.split('/');
 pathName.splice(1, 1);
 pathName = pathName.join('/');

 const clientObject = {
  pathName,
  server: 'server1',
  method: 'get',
  body: req.body,
  params: req.query,
  clientId,
 };

 io.emit('new-request', clientObject);

 clientToRespond[clientId] = res;
 return;
});

app.post('/server2/*', (req, res) => {
 const clientId = uuid();
 let pathName = url.parse(req.url).pathname.split('/');
 pathName.splice(1, 1);
 pathName = pathName.join('/');

 const clientObject = {
  pathName,
  server: 'server2',
  method: 'get',
  params: req.query,
  body: req.body,
  clientId,
 };

 io.emit('new-request', clientObject);

 clientToRespond[clientId] = res;
 return;
});

app.get('/server2/*', (req, res) => {
 const clientId = uuid();
 let pathName = url.parse(req.url).pathname.split('/');
 pathName.splice(1, 1);
 pathName = pathName.join('/');

 const clientObject = {
  pathName,
  server: 'server2',
  method: 'get',
  params: req.query,
  body: req.body,
  clientId,
 };

 io.emit('new-request', clientObject);

 clientToRespond[clientId] = res;
 return;
});

io.on('connection', (socket) => {
 console.log('a node connected');
 socket.on('new-response', ({ response, clientId }) => {
  console.log(response);
  if (response == null) {
   clientToRespond[clientId].send('Internal server error');
  } else {
   clientToRespond[clientId].json(response);
  }
  delete clientToRespond[clientId];
  return;
 });
});

http.listen(port, () => {
 console.log(`Server listening on port ${port}`);
});
