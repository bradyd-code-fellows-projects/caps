'use strict';

const { product, chance } = require('../chance');
const eventPool = require('../hub');

function shippedHandler(payload) {
  setTimeout(() => {
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
  }, 2000);
}

function deliverPackage() {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${product.payload.orderID}`);
    eventPool.emit('PACKAGE_DELIVERED', {
      EVENT: {
        event: 'delivered',
        time: chance.date(),
        payload: product.payload,
      },
    });
  }, 2000);
}

module.exports = {
  shippedHandler,
  deliverPackage,
};
