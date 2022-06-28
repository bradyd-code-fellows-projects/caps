'use strict';

const eventPool = require('../hub');
const { product, randTime } = require('../chance');

const soldHandler = (payload) => {
  console.log('Message sent: product sold, package ready for pickup');
  eventPool.emit('READY_FOR_PICKUP', {
    EVENT: {
      event: 'pickup',
      time: randTime,
      payload: product.payload,
    },
  });
};

const deliveredHandler = () => {
  console.log(`Thank you for delivering order ${product.payload.orderID}`);
};

module.exports = {
  soldHandler,
  deliveredHandler,
};
