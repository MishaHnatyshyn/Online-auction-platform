// Bid Mongoose Model

const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
  lot: { type: mongoose.Types.ObjectId, ref: 'Lot', required: true },
  sum: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Bid', bidSchema);
