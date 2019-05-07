const Lot = require('../models/lot');

module.exports = {
  getSingleLot: id => new Promise((resolve, reject) => {
    Lot.findById(id).exec((err, lot) => {
      if (err) return reject(err);
      resolve(lot);
    });
  }),
  findForSearch: (name, count) => new Promise((resolve, reject) => {
    Lot.find({ name: new RegExp(name, 'ig') }).limit(count).exec((err, lots) => {
      if (err) return reject(err);
      resolve(lots);
    });
  }),
  setCurrPrice: (lot, sum) => new Promise((resolve, reject) => {
    Lot.findById(lot).exec((err, lot) => {
      if (err) return reject(err);
      if (lot.currPrice >= sum) return resolve({ status: 1, currPrice: lot.currPrice });
      if (Date.now() > Date.parse(lot.endDate) || lot.closed) return resolve({ status: 2 });
      lot.currPrice = sum;
      lot.save((err) => {
        if (err) return resolve({ status: 1, currPrice: lot.currPrice });
        resolve({ status: 0, currPrice: sum });
      });
    });
  }),
  buyNow: lot => new Promise((resolve, reject) => {
    Lot.findById(lot).exec((err, lot) => {
      if (err) return reject(err);
      if (!lot.byNowPrice) return resolve({ status: 1 });
      if (Date.now() > Date.parse(lot.endDate) || lot.closed) return resolve({ status: 2 });
      lot.currPrice = lot.byNowPrice;
      lot.closed = true;
      lot.save((err) => {
        if (err) return resolve({ status: 1, currPrice: lot.currPrice });
        resolve({ status: 0, currPrice: sum });
      });
    });
  }),
  getLastLots: () => new Promise((resolve, reject) => {
    Lot.find({ endDate: { $gte: new Date() }, closed: false }).sort({ timestamp: -1 }).limit(22).exec((err, lots) => {
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
    Lot.paginate({ endDate: { $gte: new Date() }, closed: false }, { limit: 9, page: 1 })
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
  closeLot: lot => new Promise((resolve, reject) => {
    Lot.findOne({ _id: lot }).exec((err, res) => {
      if (err) return reject(err);
      if (res.closed) return resolve();
      res.closed = true;
      res.save((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }),
};
