// Lot Mongoose Model

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const lotSchema = mongoose.Schema({
  name: { type: String, required: true },
  closed: { type: Boolean, default: false },
  description: { type: String, required: true },
  startPrice: { type: Number, min: 1, required: true },
  currPrice: { type: Number, min: 1, default: () => this.startPrice },
  byNowPrice: { type: Number, min: 1, default: () => null },
  endDate: { type: Date, required: true },
  photos: { type: Array, default: [] },
  delivery: { type: Array, default: [] },
  payment: { type: Array, default: [] },
  category: { type: String, required: true },
  timestamp: { type: Date, default: new Date() }
});

lotSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Lot', lotSchema);
