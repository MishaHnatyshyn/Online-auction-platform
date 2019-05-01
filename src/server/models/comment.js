// Lot Mongoose Model

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const commentSchema = mongoose.Schema({
  text: { type: String, required: true },
  lot: { type: mongoose.Types.ObjectId, ref: 'Lot', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: new Date() }
});

commentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Comment', commentSchema);
