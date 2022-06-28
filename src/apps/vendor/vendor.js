'use strict';

const eventPool = require('../../hub');
const { product, chance} = require('../../chance');

const soldHandler = (payload) => {
  eventPool.emit('READY_FOR_PICKUP', {
    EVENT: {
      event: 'pickup',
      time: chance.date(),
      payload: product.payload,
    },
  });
  console.log(` 
  EVENT { event: 'pickup',
    time: ${chance.date()},
    payload: 
      { store: ${product.payload.store},
        orderID: ${product.payload.orderID},
        customer: ${product.payload.customer},
        address: ${product.payload.address} }
  }`);
};

const deliveredHandler = (payload) => {
  console.log(`Thank you for delivering order ${product.payload.orderID}`);
  console.log(`
  EVENT { event: 'delivered',
    time: ${chance.date()},
    payload:
      { store: ${product.payload.store},
      orderID: ${product.payload.orderID},
      customer: ${product.payload.customer},
      address: ${product.payload.address} }
    }`);
};

module.exports = {
  soldHandler,
  deliveredHandler,
};
