'use strict';

module.exports = (socket) => (payload) => {
  console.log(`VENDOR acknowledges pickup of ${payload.orderId}`);
  socket.emit('ACKNOWLEDGED', payload);
}