'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const createhandleShipped = require('./handleShipped/index');
const createhandleDelivered = require('./handleDelivered/index');
const DriverClient = require('./lib/driverClient');
const driver = new DriverClient('driver');

const ship = createhandleShipped(socket);
const deliver = createhandleDelivered(socket);

driver.subscribe('READY_FOR_PICKUP', ship);
driver.subscribe('ACKNOWLEDGED', deliver);
