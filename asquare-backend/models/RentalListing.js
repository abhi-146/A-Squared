const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RentalListingSchema = new Schema({
  displayImages: [String],
  title: String,
  price: Number,
  propertyType: String,
  furnishing: String,
  tagline: String,
  developer: {
    title: String,
    logo: String
  },
  lat: Number,
  lon: Number,
  haveMaid: Number,
  haveStudio: Number,
  availableFrom: Date,
  location: String,
  community: String,
  baths: String,
  beds: String,
  area: Number,
  soldType: String,
  description: String,
  amenities: [String],
  transaction: {
    soldFor: [{
      date: Date,
      aed: Number,
      area: Number
    }],
    rentedFor: [{
      date: Date,
      aed: Number,
      area: Number
    }]
  },
  priceTrends: [String], // Assuming format "month:price" stored as a string
  regulatoryInformation: {
    reference: String,
    listed: String,
    brokerOrn: String,
    zoneName: String,
    dldPermitNumber: String,
    barcode: String
  }
}, { timestamps: true });

module.exports = mongoose.model('RentalListing', RentalListingSchema);
