const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  petType: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'general'],
    index: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  subCategory: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
    index: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0,
    default: 10,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
    index: true,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true,
  },
  breedSuitability: [{
    type: String,
  }],
  images: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
  specifications: {
    type: Map,
    of: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

// Virtual discounted price
productSchema.virtual('discountedPrice').get(function () {
  if (!this.discountPercentage) return this.price;
  return Math.round(this.price * (1 - this.discountPercentage / 100));
});

module.exports = mongoose.model('Product', productSchema);
