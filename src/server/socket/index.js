const socketIo = require('socket.io')
const handler = require('./handler');

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connection', (socket) => {
    console.log('a user connected');
    handler(socket, io);
  });
}
