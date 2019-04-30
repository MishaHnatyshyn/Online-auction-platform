const Lot = require('../models/lot');

module.exports = {
  getSingleLot: id => new Promise((resolve, reject) => {
    Lot.findById(id).exec((err, lot) => {
      if (err) return reject(err);
      resolve(lot);
    });
  }),
  getLastLots: () => new Promise((resolve, reject) => {
    Lot.find().limit(22).exec((err, lots) => {
      if (err) return reject(err);
      resolve(lots);
    });
  }),
  getLotsList: ids => new Promise((resolve, reject) => {
    Lot.find({ _id: { $in: ids } }).exec((err, lots) => {
      if (err) return reject(err);
      resolve(lots);
    });
  }),
  getAllLots: () => new Promise((resolve, reject) => {
    Lot.paginate({}, { limit: 9, page: 1 })
      .then((res) => {
        resolve(res);
      })
      .catch(err => reject(err));
  }),
  getFilteredLots: (match, options) => new Promise((resolve, reject) => {
    Lot.paginate(match, options)
      .then((res) => {
        resolve(res);
      })
      .catch(err => reject(err));
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
