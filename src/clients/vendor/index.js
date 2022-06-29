'use strict';

const Chance = require('chance');
const chance = new Chance();

const { io } = require('socket.io-client');

const socket = io('http://localhost:3001/caps');
const store = '1-206-flowers';

socket.on('DELIVERED', handleDelivered);

setTimeout(() => {
  let order = {
    store,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  socket.emit('PICKUP', order);
}, 2000)