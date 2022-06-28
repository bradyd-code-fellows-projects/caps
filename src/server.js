'use strict';

const eventPool = require('./hub');
const { soldHandler, deliveredHandler } = require('./apps/vendor/vendor');
const { shippedHandler, deliverPackage } = require('./apps/driver/driver');

const product = require('./chance');

eventPool.on('PRODUCT_SOLD', soldHandler);
eventPool.on('READY_FOR_PICKUP', shippedHandler);
eventPool.on('PACKAGE_SHIPPED', deliverPackage);
eventPool.on('PACKAGE_DELIVERED', deliveredHandler);

setTimeout(() => {
  eventPool.emit('PRODUCT_SOLD', { product });
}, 1000);
