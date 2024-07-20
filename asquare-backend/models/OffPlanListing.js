const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OffPlanListingSchema = new Schema({
  displayImages: [String],
  title: String,
  rent: String,
  developer: {
    title: String,
    logo: String
  },
  location: String,
  community: String,
  baths: String,
  beds: String,
  area: Number,
  city: String,
  lat: Number,
  lon: Number,
  information: {
    deliveryDate: Date,
    numberOfBuildings: Number,
    paymentPlan: String,
    governmentFees: Number,
    propertyType: String
  },
  description: String,
  paymentPlan: {
    downPayment: Number,
    duringConstruction: Number,
    onHandover: Number
  },
  projectTimeline: {
    projectAnnouncement: Date,
    constructionStarted: Date,
    expectedCompletion: Date
  },
  units: {
    
    apartment:{
      status: Boolean,
      floors: String,
      areas: String,
      apartmentFloorImages: [String]
    },
    penthouse:{
      status: Boolean,
      floors: String,
      areas: String,
      penthouseFloorImages: [String]
    },
    townhouse:{
      status: Boolean,
      floors: String,
      areas: String,
      townhouseFloorImages: [String]
    },
    duplex:{
      status: Boolean,
      floors: String,
      areas: String,
      duplexFloorImages: [String]
    },
    villa:{
      status: Boolean,
      floors: String,
      areas: String,
      villaFloorImages: [String]
    }
   
  },
  masterplan: [String],
  amenities: [String]
}, { timestamps: true });

const OffPlanListing = mongoose.model('OffPlanListing', OffPlanListingSchema);

module.exports = OffPlanListing;
