const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: String
  },
  reviewer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer'
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film'
  },
  review: {
    type: String,
    maxlength: 140
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Review', reviewSchema);
