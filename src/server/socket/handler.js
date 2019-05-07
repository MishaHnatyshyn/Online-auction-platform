const db = require('../db');

module.exports = (socket, io) => {
  socket.on('connect to lot room', async ({ lot }) => {
    socket.join(lot);
  });
  socket.on('disconnect from lot room', async ({ lot }) => {
    socket.disconnect();
  });
  socket.on('make a bid', async ({ lot, sum, user }) => {
    try {
      const { status, currPrice } = await db.lot.setCurrPrice(lot, sum);
      if (status === 1) return socket.emit('bid failure', { price: currPrice });// Someone made a bid earlier
      if (status === 2) return socket.emit('lot closed', { status: 'closed' });// Lot is closed
      await db.bid.create({ user, lot, sum });// Everything is OK, create new bid document
      io.to(lot).emit('price update', { price: currPrice, user });
    } catch (e) {
      socket.emit('error');
    }
  });
  socket.on('close lot', async ({ lot }) => {
    try {
      await db.lot.closeLot(lot);
      const user = await db.bid.getLastBidUser(lot);
      if (user) await db.user.addBoughtLot(lot, user);
    } catch (e) {
      console.log(e);
    }
  });
  socket.on('buy now', async ({ lot, sum, user }) => {
    try {
      const { status } = await db.lot.buyNow(lot);
      if (status === 1) return;// Lot has no "Buy now" price
      if (status === 2) return socket.emit('lot closed', { status: 'closed' });// Lot is closed
      await db.bid.create({ user, lot, sum });// Everything is OK, create new bid document
      if (user) await db.user.addBoughtLot(lot, user);
      io.to(lot).emit('close lot', { price: sum, user });
    } catch (e) {
      socket.emit('error');
    }
  });
};
