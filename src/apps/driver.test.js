'use strict';

const shippedHandler = require('./vendor');
const eventPool = require('../hub');

jest.mock('../hub.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Driver Tests', () => {
  test.todo('Shipped test');
});

