const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourRequestSchema = new Schema({
  tourtype: String,
  date: Date,
  time: String,
  name: String,
  phone: String,
  email: String,
  message: String
});

module.exports = mongoose.model('TourRequest', TourRequestSchema);
