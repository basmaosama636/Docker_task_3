const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  category: String
}, { timestamps: true });


productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);
