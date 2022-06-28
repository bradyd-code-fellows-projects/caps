'use strict';

const Chance = require('chance');
const chance = new Chance();

let product = {
  payload: {
    store: chance.company(),
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  },
};

module.exports = {
  product,
  chance,
};
