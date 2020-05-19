const router = require('express').Router();

const User = require('../../models/User');
const Listing = require('../../models/Listing');
const Purchase = require('../../models/Purchase');


router.post('/', async (req, res) => {
  const data = req.body;
  let user = await User.findOne({username: data.user.nickname});
  let listing = await Listing.findOne({_id: data.listingId});
  let purchase = await ((new Purchase({
    owner: user,
    tokens: data.tokens,
    listing: listing,
    ownerEthAccAddress: data.ownerEthAccAddress,
    txHash: data.txHash,
  })).save());
  return res.json(purchase);
});

module.exports = router;