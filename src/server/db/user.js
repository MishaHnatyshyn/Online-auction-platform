const User = require('../models/user');

module.exports = {
  getById: id => new Promise((resolve, reject) => {
    User.findById(id).exec((err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  }),
  findByEmail: email => new Promise((resolve, reject) => {
    User.findOne({ email }).exec((err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  }),
  create: (email, password, username) => new Promise((resolve, reject) => {
    const newUser = new User();

    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.username = username;

    newUser.save((err) => {
      if (err) return reject(err);
      resolve(newUser);
    });
  }),
  getPostedLots: user => new Promise((resolve, reject) => {
    User.findOne({ _id: user }).exec((err, user) => {
      if (err) return reject(err);
      resolve(user.lots);
    });
  }),
  getBoughtLots: user => new Promise((resolve, reject) => {
    User.findOne({ _id: user }).exec((err, user) => {
      if (err) return reject(err);
      resolve(user.bought_lots);
    });
  }),
  addBoughtLot: (lot, user) => new Promise((resolve, reject) => {
    User.updateOne({ _id: user }, { $push: { bought_lots: lot } }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  }),
  addPostedLot: (lot, user) => new Promise((resolve, reject) => {
    User.updateOne({ _id: user }, { $push: { lots: lot } }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  }),
};
