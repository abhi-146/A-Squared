const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactUsUserSchema = new Schema({
  type: {
    type: String,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  propertyType: {
    type: String
  },
  zipCode: {
    type: String
  },
  city: {
    type: String
  },
  beds: {
    type: String
  },
  baths: {
    type: String
  },
  budget: {
    type: String
  }
});

module.exports = mongoose.model('ContactUsUser', ContactUsUserSchema);
