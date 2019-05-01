const Bid = require('../models/bid');

module.exports = {
  create: data => new Promise((resolve, reject) => {
    const newBid = new Bid(data);
    newBid.save((err) => {
      if (err) return reject(err);
      resolve(newBid);
    });
  }),
  getBidsByLot: lot => new Promise((resolve, reject) => {
    Bid.find({ lot }).sort({ timestamp: 1 }).exec((err, bids) => {
      if (err) return reject(err);
      resolve(bids);
    });
  }),
  getLastBid: lot => new Promise((resolve, reject) => {
    Bid.findOne({ lot }).sort({ timestamp: 1 }).exec((err, bid) => {
      if (err) return reject(err);
      resolve(bid);
    });
  }),
  getLastBidUser: lot => new Promise((resolve, reject) => {
    Bid.findOne({ lot }).sort({ timestamp: 1 }).populate('user').exec((err, bid) => {
      if (err) return reject(err);
      resolve(bid.user);
    });
  }),
};
