const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  company:{
    type: String
  }
});

module.exports = mongoose.model('Reviewer', reviewerSchema);
