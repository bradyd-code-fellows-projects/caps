'use strict';

const shippedHandler = require('../vendor/vendor');
const eventPool = require('../../hub');
const product = require('../../chance');
const chance = require('../../chance');

jest.mock('../../hub.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Vendor Tests', () => {
  test.todo('Vendor Test 1')
})