'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3001/caps');

socket.on('PICKUP', (payload) => {

  setTimeout(() => {
    console.log(`DRIVER : picked up order ${payload.orderId}`);
    socket.emit('IN-TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.orderId}`);
    socket.emit('DELIVERED', payload);
  }, 1000);
});

