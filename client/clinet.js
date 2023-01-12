const proxySeverUrl = 'https://localhost-to-live-iull.onrender.com';

const localUrl1 = 'http://localhost:5001';
const localUrl2 = 'http://localhost:5002';

const socket = require('socket.io-client')(proxySeverUrl);
const superagent = require('superagent');

socket.on('connect', () => {
 console.log('Connected with the proxy server');
});

socket.on('disconnect', () => {
 console.log('Disconnected from proxy server');
});

socket.on(
 'new-request',
 ({ pathName, server, method, params, clientId, body }) => {
  console.log('new request', {
   pathName,
   server,
   method,
   params,
   clientId,
   body,
  });
  let urlToRequest;
  if (server === 'server1') urlToRequest = localUrl1 + pathName;
  else urlToRequest = localUrl2 + pathName;

  if (method === 'get') {
   superagent
    .get(urlToRequest)
    .query(params)
    .end((err, response) => {
     if (err) {
      socket.emit('new-response', { response: null, clientId });
     }
     socket.emit('new-response', { response, clientId });
    });
  } else if (method === 'post') {
   superagent
    .post(urlToRequest)
    .send(body)
    .query(params)
    .end((err, response) => {
     if (err) {
      socket.emit('new-response', { response: null, clientId });
     }
     socket.emit('new-response', { response, clientId });
    });
  }
 },
);
