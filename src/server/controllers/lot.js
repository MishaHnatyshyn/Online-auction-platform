const db = require('../db')

module.exports = {
  getLotData: async (req, res) => {
    try {
      const { id } = req.body;
      const lot = await db.lot.getSingleLot(id);
      res.json(lot);
    } catch (e) {
      res.status(500).end();
    }
  },
  getLotsPageData: async (req, res) => {
    try {
      res.end();
    } catch (e) {
      res.status(500).end();
    }
  },
  createLot: async (req, res) => {
    try {
      res.end();
    } catch (e) {
      res.status(500).end();
    }
  },
  deleteLot: async (req, res) => {
    try {
      const { id } = req.body;
      await db.lot.deleteLot(id);
      res.end();
    } catch (e) {
      res.status(500).end();
    }
  }
};
