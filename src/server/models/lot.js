// Lot Mongoose Model

const mongoose = require('mongoose');

const lotSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startPrice: { type: Number, min: 1, required: true },
  currPrice: { type: Number, min: 1, default: () => this.startPrice },
  photos: { type: Array, default: [] },
  delivery: { type: Array, default: [] },
  payment: { type: Array, default: [] },
  timestamp: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Lot', lotSchema);
