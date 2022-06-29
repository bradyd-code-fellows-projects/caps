'use strict';

// const eventPool = require('./hub');
// const { soldHandler, deliveredHandler } = require('./apps/vendor/vendor');
// const { shippedHandler, deliverPackage } = require('./apps/driver/driver');

// const product = require('./chance');

// eventPool.on('PRODUCT_SOLD', soldHandler);
// eventPool.on('READY_FOR_PICKUP', shippedHandler);
// eventPool.on('PACKAGE_SHIPPED', deliverPackage);
// eventPool.on('PACKAGE_DELIVERED', deliveredHandler);

// setTimeout(() => {
//   eventPool.emit('PRODUCT_SOLD', { product });
// }, 1000);

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

const server = new Server(PORT);

server.on('connection', (socket) => {
  console.log('Socket connected to the Event Server', socket.id);
  socket.on('MESSAGE', (payload) => {
    console.log('Server MESSAGE event ', payload);
    socket.broadcast.emit('MESSAGE', payload);
  });

  socket.on('RECEIVED', (payload) => {
    console.log('Server RECEIVED event', payload);
    socket.broadcast.emit('RECEIVED', payload);
  });
});
