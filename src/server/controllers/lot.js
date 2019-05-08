const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('../db');

const storage = multer.diskStorage({
  async destination(req, file, cb) {
    const pathToDir = path.join(__dirname, '../../../static', req.body.dir);
    fs.mkdir(pathToDir, () => cb(null, pathToDir));
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadPhoto = multer({ storage });

const getBoughtLots = async (user) => {
  const lots = await db.bid.getUserBidLots(user);
  const lastBiddedUsers = await Promise.all(lots.map(lot => db.bid.getLastBidUser(lot)));
  const lotsAndLastbids = lots.map((lot, index) => ({ lot, user: lastBiddedUsers[index] }));
  return lotsAndLastbids.filter(_ => {
    return _.user.toString() === user.toString()
  }).map(_ => _.lot);
};

const returnSearchAmongParams = async (param, user) => {
  if (param === 'active') return { endDate: { $gte: new Date() }, closed: false };
  if (param === 'sold') return { closed: true };
  if (!user) return {};
  if (param === 'my') return { _id: { $in: await db.user.getPostedLots(user.id) } };
  if (param === 'bids') return { _id: { $in: await db.bid.getUserBidLots(user.id) }, closed: false, endDate: { $gte: new Date() } };
  if (param === 'bought') {
    return {
      _id: { $in: await getBoughtLots(user.id) },
      $or: [
        { closed: true },
        { endDate: { $lte: new Date() } }
      ]
    };
  }
};

module.exports = {
  getLotData: async (req, res) => {
    try {
      const { id } = req.body;
      const lot = await db.lot.getSingleLot(id);
      const actualUserBid = await db.bid.getLastBidUser(id);
      if (!lot) return res.status(404).end();
      res.json({ ...lot._doc, actualUserBid });
    } catch (e) {
      res.status(500).end();
    }
  },
  getLotsPageData: async (req, res) => {
    try {
      const { docs, totalPages } = await db.lot.getAllLots();
      res.json({ lots: docs, pagesCount: totalPages });
    } catch (e) {
      res.status(500).end();
    }
  },

  getLastLots: async (req, res) => {
    try {
      const lots = await db.lot.getLastLots();
      res.json(lots);
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  },

  getFilteredLots: async (req, res) => {
    try {
      const {
        priceFrom,
        priceTo,
        selectedPaymentMethods,
        selectedDeliveryMethods,
        category,
        sortBy,
        page,
        name,
        searchAmong
      } = req.body;
      const match = searchAmong ? await returnSearchAmongParams(searchAmong, req.user) : {};
      const options = { page, limit: 9 };
      if (selectedPaymentMethods && selectedPaymentMethods.length > 0) {
        match.payment = { $in: selectedPaymentMethods };
      }
      if (selectedDeliveryMethods && selectedDeliveryMethods.length > 0) {
        match.delivery = { $in: selectedDeliveryMethods };
      }
      if (category) match.category = category;
      if (name) match.name = new RegExp(name, 'ig');
      if (priceFrom && priceTo) match.currPrice = { $gte: priceFrom, $lte: priceTo };
      else if (priceFrom) match.currPrice = { $gte: priceFrom };
      else if (priceTo) match.currPrice = { $lte: priceTo };
      if (sortBy) options.sort = sortBy;
      const { docs, totalPages } = await db.lot.getFilteredLots(match, options);
      res.json({ lots: docs, pagesCount: totalPages });
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  },

  uploadPhotos: uploadPhoto.array('photos'),

  createLotPhotos: (req, res) => res.end(),

  createLot: async (req, res) => {
    try {
      const newLot = await db.lot.createLot(req.body);
      await db.user.addPostedLot(newLot.id, req.user.id);
      res.json(newLot);
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
