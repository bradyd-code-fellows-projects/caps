'use strict';

const { shippedHandler } = require('../driver/driver');
const eventPool = require('../../hub');
const { product } = require('../../chance');
// const { chance } = require('../../chance');

jest.mock('../../hub.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Driver Tests', () => {

  console.log = jest.fn();

  test('Shipped handler should emit package shipped event', () => {
    shippedHandler(product.payload);
    expect(eventPool.emit).toHaveBeenCalledWith('PACKAGE_SHIPPED', {
      EVENT: {
        event: 'in-transit',
        payload: product.payload,
      },
    });
    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${product.payload.orderId}`);
  });

  test.todo('Deliver package should emit package delivered event');
});

