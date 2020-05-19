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


router.get('/user/:username', async (req, res) => {
  let user = await User.findOne({username: req.params.username});
  let purchases = await Purchase.find({owner: user._id})
                                .populate(['owner', 'listing'])
                                .sort({createdAt: -1})
                                .exec();
  res.json(purchases);
});


router.get('/listing/:listingId', async (req, res) => {
  let purchases = await Purchase.find({listing: req.params.listingId})
                                .populate(['owner', 'listing'])
                                .sort({createdAt: -1})
                                .exec();
  console.log(purchases);
  res.json(purchases);
});


module.exports = router;