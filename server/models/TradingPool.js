const mongoose = require('mongoose');


const TradingPoolSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  },
  exchangeAddress: {
    type: String,
    default: ""
  },
}, {timestamps: true});


module.exports = mongoose.model('TradingPool', TradingPoolSchema);