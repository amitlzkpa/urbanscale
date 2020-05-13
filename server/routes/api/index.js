const router = require('express').Router();

router.use('/users', require('./user'));
router.use('/listing', require('./listing'));

module.exports = router;