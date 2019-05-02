const db = require('../db');

module.exports = (socket, io) => {
  socket.on('connect to lot room', async ({ lot }) => {
    console.log('connect to lot room', lot);
    socket.join(lot);
  });
  socket.on('disconnect from lot room', async ({ lot }) => {
    console.log('disconnect from lot room', lot);
    socket.disconnect();
  });
  socket.on('make a bid', async ({ lot, sum, user }) => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    console.log('make a bid', { lot, sum, user })
    const { status, currPrice } = await db.lot.setCurrPrice(lot, sum);
    if (status === 1) return socket.emit('bid failure', { price: currPrice });// Someone made a bid earlier
    if (status === 2) return socket.emit('lot closed', { status: 'closed' });// Lot is closed
    await db.bid.create({ user, lot, sum });// Everything is OK, create new bid document
    io.to(lot).emit('price update', { price: currPrice, user });
  });
};
