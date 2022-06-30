'use strict';

const { Server } = require('socket.io');
const Queue = require('./lib/queue');

const PORT = process.env.PORT || 3001;
const server = new Server(PORT);
const caps = server.of('/caps');

const messageQueue = new Queue();


caps.on('connection', (socket) => {
  console.log('Socket connected to event server: ', socket.id);

  socket.onAny((event, payload) => {
    let time = new Date();
    console.log('EVENT:', {event, time, payload});
  });

  socket.on('SOLD', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.driverId, payload);
    console.log(`VENDOR: a new item has been sold`);
    socket.broadcast.emit('SOLD', payload);
    logEvent('SOLD', payload);
  });

  socket.on('READY_FOR_PICKUP', (payload) => {
    console.log(`VENDOR: ${payload.orderId} ready for pickup`);
    socket.emit('READY_FOR_PICKUP', payload);
    logEvent('READY_FOR_PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    socket.emit('IN-TRANSIT', payload);
    logEvent('IN-TRANSIT', payload);
  });

  socket.on('ACKNOWLEDGED', (payload) => {
    socket.emit('ACKNOWLEDGED', payload);
    logEvent('ACKNOWLEDGED', payload);
  });

  socket.on('ACKNOWLEDGED', (payload) => {
    socket.emit('ACKNOWLEDGED', payload);
    logEvent('ACKNOWLEDGED', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue created for this message');
    }
    let message = currentQueue.remove(payload.driverId);
    console.log(`DRIVER: ${payload.orderId} delivered to ${payload.customer}`);
    socket.broadcast.emit('DELIVERED', payload);
    logEvent('DELIVERED', payload);
  });

});

function logEvent(event, payload) {
  let time = new Date().toLocaleString();
  console.log('EVENT', {event, time, payload});
}