// models/NewsletterSubscribers.js
const mongoose = require('mongoose');

const NewsletterSubscribersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  countryCode: {
    type: String,
    required: [true, 'Country code is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  }
});

const NewsletterSubscribers = mongoose.model('NewsletterSubscribers', NewsletterSubscribersSchema);

module.exports = NewsletterSubscribers;
