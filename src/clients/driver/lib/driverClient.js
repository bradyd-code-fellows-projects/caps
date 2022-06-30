'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3001/caps');

class DriverClient {
  constructor(queueId) {
    this.queueId = queueId;
    this.socket = io(socket);
    this.socket.emit('JOIN', {queueId});
    this.socket.on('JOIN', (id) => {
      console.log('Joined Driver queue!', id);
    });
  }
  subscribe(event, callback) {
    this.socket.on(event, callback);
  }
}

module.exports = DriverClient;