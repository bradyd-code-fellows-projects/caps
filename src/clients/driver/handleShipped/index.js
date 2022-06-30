'use strict';

module.exports = (socket) => (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('IN-TRANSIT', payload);
};