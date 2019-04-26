const db = require('../db')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  async destination(req, file, cb) {
    const pathToDir = path.join(__dirname, '../../../static', req.body.dir)
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
