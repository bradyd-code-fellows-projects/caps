'use strict';

const deliveredHandler = (payload) => {
  console.log(`Thank you for delivering order ${product.payload.orderId}`);
  console.log(`
  EVENT { event: 'delivered',
    time: ${chance.date()},
    payload:
      { store: ${product.payload.store},
      orderId: ${product.payload.orderId},
      customer: ${product.payload.customer},
      address: ${product.payload.address} }
    }`);
};