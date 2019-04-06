const Lot = require('../models/lot');

module.exports = {
  getSingleLot: id => new Promise((resolve, reject) => {
    Lot.findById(id).exec((err, lot) => {
      if (err) return reject(err);
      resolve(lot);
    });
  }),
  getLotsList: ids => new Promise((resolve, reject) => {
    Lot.find({ _id: { $in: ids } }).exec((err, lots) => {
      if (err) return reject(err);
      resolve(lots);
    });
  }),
  getAllLots: () => new Promise((resolve, reject) => {
    Lot.find().exec((err, lots) => {
      if (err) return reject(err);
      resolve(lots);
    });
  }),
  createLot: data => new Promise((resolve, reject) => {
    const newLot = new Lot(data);
    newLot.save((err) => {
      if (err) return reject(err);
      resolve(newLot);
    });
  }),
  deleteLot: id => new Promise((resolve, reject) => {
    Lot.deleteOne({ _id: id }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  }),
};
