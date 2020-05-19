const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    index: true,
    default: ""
  },
  issuer: {
    type: String,
    index: true,
    default: ""
  },
  cusipNo: {
    type: String,
    index: true,
    default: ""
  },
  emmaId: {
    type: String,
    index: true,
    default: ""
  },
  maturityDate: {
    type: Date,
    index: true,
    default: null
  },
  principal: {
    type: Number,
    index: true,
    default: null
  },
  coupon: {
    type: Number,
    index: true,
    default: null
  },
  tokenSupply: {
    type: Number,
    index: true,
    default: null
  },
  description: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  contractAddress: {
    type: String,
    default: ""
  },
}, {timestamps: true});

module.exports = mongoose.model('Listing', ListingSchema);