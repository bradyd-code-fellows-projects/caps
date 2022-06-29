'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost: 3001');
const chance = require('../../../chance');

function shippedHandler(payload) {
  eventPool.emit('PACKAGE_SHIPPED', {
    EVENT: {
      event: 'in-transit',
      time: chance.date(),
      payload: product.payload,
    },
  });
  console.log(`DRIVER: picked up ${product.payload.orderID}`);
  console.log(` 
  EVENT { event: 'in-transit',
    time: ${chance.date()},
    payload: 
      { store: ${product.payload.store},
        orderID: ${product.payload.orderID},
        customer: ${product.payload.customer},
        address: ${product.payload.address} }
  }`);
}