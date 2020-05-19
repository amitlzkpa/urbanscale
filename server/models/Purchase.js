const mongoose = require('mongoose');


const PurchaseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tokens: {
    type: Number,
    default: null
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ownerEthAccAddress: {
    type: String,
    default: ""
  },
  txHash: {
    type: String,
    default: ""
  },
}, {timestamps: true});


module.exports = mongoose.model('Purchase', PurchaseSchema);