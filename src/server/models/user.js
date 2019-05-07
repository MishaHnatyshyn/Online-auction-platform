const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');// hash generating module

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  lots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lot', default: [] }],
  bought_lots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lot', default: [] }],
});

// generate hash from password to store in db;
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// compare hash stored in db and hash generated from entered password
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
