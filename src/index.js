'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

// localhost:3001
const server = new Server(PORT);
// localhost:3001/caps
const caps = server.of('/caps');

caps.on('connection', (socket) => {

  console.log(socket.id, ' connected to namespace');

  socket.on('JOIN', room => {
    console.log(`Joined ${room}` );
    socket.join(room);
  });

  //PICKUP
  socket.on('PICKUP', (payload) => {
    logger('PICKUP', payload);
    caps.to(payload.store).emit('PICKUP', payload);
  });

  //IN-TRANSIT
  socket.on('IN-TRANSIT', (payload) => {
    logger('IN-TRANSIT', payload);
    caps.emit('IN-TRANSIT', payload);
  });

  //DELIVERED
  socket.on('DELIVERED', (payload) => {
    logger('DELIVERED', payload);
    caps.to(payload.store).emit('DELIVERED', payload);
  });

});

function logger(event, payload) {
  let time = new Date();
  console.log('EVENT', {event, time, payload});
}
