const db = require('../db')



module.exports = {
  mainPageData: async (req, res) => {
    try {
      const lots = await db.lot.getLastLots()
      res.json(lots);
    } catch (e) {
      res.end();
    }
  },
  userData: (req, res) => {
    try {
      if (!req.user) return res.end()
      const { username, _id } = req.user;
      res.json({ username, _id });
    } catch (e) {
      res.end();
    }
  },
  login: async (req, res) => {
    try {
      const { username, _id } = req.user;
      res.json({ username, _id });
    } catch (e) {
      res.end();
    }
  },
  logout: async (req, res) => {
    try {
      req.logout();
      req.end()
    } catch (e) {
      res.end();
    }
  },

  register: async (req, res) => {
    try {
      const { username, _id } = req.user;
      res.json({ username, _id });
    } catch (e) {
      res.end();
    }
  },
};
