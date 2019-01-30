const mongoose = require('mongoose');
const { Schema } = mongoose;

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: [{
    role: String,
    actor: {
      type: Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

module.exports = mongoose.model('Film', filmSchema);
