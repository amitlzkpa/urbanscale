const router = require('express').Router();

router.use('/users', require('./user'));
router.use('/listing', require('./listing'));
router.use('/purchase', require('./purchase'));
router.use('/trading-pool', require('./trading-pool'));
// router.use('/emma', require('./emma'));

module.exports = router;