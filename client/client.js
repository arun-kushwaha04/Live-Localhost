const proxySeverUrl = 'http://localhost:8000';

const localUrl1 = 'http://localhost:5001';
const localUrl2 = 'http://localhost:5002';

const { io } = require('socket.io-client');
const axios = require('axios');

const socket = io(proxySeverUrl);

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
   getRequest(urlToRequest, clientId);
  } else if (method === 'post') {
   postRequest(urlToRequest, clientId);
  }
 },
);

const getRequest = async (urlToRequest, clientId) => {
 console.log('GET / ', urlToRequest);
 try {
  const response = await axios.get(urlToRequest);
  socket.emit('new-response', { response: response.data, clientId });
 } catch (error) {
  socket.emit('new-response', { response: null, clientId });
 }
};
const postRequest = async (urlToRequest, clientId) => {
 console.log('POST / ', urlToRequest);
 try {
  const response = await fetch.post(urlToRequest, body);
  socket.emit('new-response', { response: response.data, clientId });
 } catch (error) {
  socket.emit('new-response', { response: null, clientId });
 }
};
