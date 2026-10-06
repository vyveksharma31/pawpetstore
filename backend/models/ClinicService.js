const mongoose = require('mongoose');

const clinicServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide service title'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide service category'],
    enum: ['Consultation', 'Preventive Care', 'Dental Hygiene', 'Specialized Care', 'Nutrition', 'Emergency', 'General'],
    default: 'Consultation',
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description'],
    maxlength: 200,
  },
  fullDescription: {
    type: String,
    required: [true, 'Please provide full clinical description'],
  },
  durationMinutes: {
    type: Number,
    required: true,
    default: 30,
  },
  price: {
    type: Number,
    required: [true, 'Please specify service fee'],
    min: 0,
  },
  targetPets: {
    type: [String],
    default: ['dog', 'cat'],
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ClinicService', clinicServiceSchema);
