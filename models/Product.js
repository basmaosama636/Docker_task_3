const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  category: String
}, { timestamps: true });

// Index for search if لاحقاً عايزة تضيفي البحث
productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);
