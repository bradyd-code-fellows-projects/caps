'use strict';

module.exports = (socket) => (payload) => {
  console.log(`DRIVER: ${payload.orderId} delivered to ${payload.customer}`);
  socket.emit('DELIVERED', payload);
};