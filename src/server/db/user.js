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
};
