'use strict';

const { product, randTime } = require('../chance');
const eventPool = require('../hub');

function shippedHandler(payload) {
  console.log(`DRIVER: picked up ${product.payload.orderID}`);
  eventPool.emit('PACKAGE_SHIPPED', {
    EVENT: {
      event: 'in-transit',
      time: randTime,
      payload: product.payload,
    },
  });
}

function deliverPackage() {
  setInterval(() => {
    console.log(`DRIVER: delivered ${product.payload.orderID}`);
    eventPool.emit('PACKAGE DELIVERED', {
      EVENT: {
        event: 'delivered',
        time: randTime,
        payload: product.payload,
      },
    });
  }, 3000);
}

module.exports = {
  shippedHandler,
  deliverPackage,
};
