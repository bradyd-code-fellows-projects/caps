'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const createhandleSold = require('./handleSold/index');
const createhandleInTransit = require('./handleInTransit/index');
const createhandleDelivered = require('./handleDelivered/index');
const VendorClient = require('./lib/vendorClient');
const { Chance } = require('chance');
const chance = new Chance();
const vendor = new VendorClient('vendor');

const sell = createhandleSold(socket);
const acknowledge = createhandleInTransit(socket);
const thank = createhandleDelivered(socket);

vendor.subscribe('SOLD', sell);
vendor.subscribe('IN_TRANSIT', acknowledge);
vendor.subscribe('DELIVERED', thank);

setInterval(() => {
  const payload = {
    store: 'acme-widgets',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address()
  }
  vendor.publish('SOLD', { vendorId: chance.guid(), ...payload})
}, 3000);

setInterval(() => {
  const payload = {
    store: '1-800-flowersi',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address()
  }
  vendor.publish('SOLD', { vendorId: chance.guid(), ...payload})
}, 3000);
