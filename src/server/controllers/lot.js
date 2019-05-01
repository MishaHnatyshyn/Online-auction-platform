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

module.exports = {
  getLotData: async (req, res) => {
    try {
      const { id } = req.body;
      const lot = await db.lot.getSingleLot(id);
      if (!lot) return res.status(404).end();
      res.json(lot);
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
      console.log(e)
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
        page
      } = req.body;
      const match = { };
      const options = { page, limit: 9 };
      if (selectedPaymentMethods && selectedPaymentMethods.length > 0) {
        match.payment = { $in: selectedPaymentMethods };
      }
      if (selectedDeliveryMethods && selectedDeliveryMethods.length > 0) {
        match.delivery = { $in: selectedDeliveryMethods };
      }
      if (category) match.category = category;
      if (priceFrom && priceTo) match.startPrice = { $gte: priceFrom, $lte: priceTo };
      else if (priceFrom) match.startPrice = { $gte: priceFrom };
      else if (priceTo) match.startPrice = { $lte: priceTo };
      if (sortBy) options.sort = sortBy;
      const { docs, totalPages } = await db.lot.getFilteredLots(match, options);
      res.json({ lots: docs, pagesCount: totalPages });
    } catch (e) {
      console.log(e)
      res.status(500).end();
    }
  },

  uploadPhotos: uploadPhoto.array('photos'),

  createLotPhotos: (req, res) => res.end(),

  createLot: async (req, res) => {
    try {
      const newLot = await db.lot.createLot(req.body);
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
