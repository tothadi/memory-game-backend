var mongoose = require('mongoose');

var resultSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
});

mongoose.model('Result', resultSchema);
