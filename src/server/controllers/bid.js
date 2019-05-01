const db = require('../db');

module.exports = {
  makeBid: async (req, res) => {
    const user = req.user.id;
    const { sum, lot } = req.body;
    const { status, currPrice } = await db.lot.setCurrPrice(lot, sum);
    if (status === 1) return res.json({ status: 1, currPrice });// Someone made a bid earlier
    if (status === 2) return res.json({ status: 2 });// Lot is closed
    await db.bid.create({ user, lot, sum });// Everything is OK, create new bid document
    res.json({ status: 0, currPrice: sum });
  }
}
