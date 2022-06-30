'use strict';

module.exports = (socket) => (payload) => {
  console.log(`VENDOR: ${payload.orderId} ready for pickup`);
  socket.emit('READY_FOR_PICKUP', payload);
}