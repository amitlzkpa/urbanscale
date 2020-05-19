const router = require('express').Router();

router.use('/users', require('./user'));
router.use('/listing', require('./listing'));
router.use('/purchase', require('./purchase'));
// router.use('/emma', require('./emma'));

router.use('*', (req, res) => res.sendFile('../../../dist/index.html'));

module.exports = router;