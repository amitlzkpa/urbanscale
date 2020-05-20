const router = require('express').Router();

const User = require('../../models/User');
const Listing = require('../../models/Listing');
const TradingPool = require('../../models/TradingPool');


router.post('/', async (req, res) => {
  const data = req.body;
  let user = await User.findOne({username: data.user.nickname});
  let listing = await Listing.findOne({_id: data.listing._id});
  let tpool = await ((new TradingPool({
    owner: user,
    listing: listing,
    exchangeAddress: data.exchangeAddress
  })).save());
  return res.json(tpool);
});


router.get('/all', async (req, res) => {
  let pools = await TradingPool.find({}).sort({createdAt: -1});
  res.json(pools);
});


module.exports = router;