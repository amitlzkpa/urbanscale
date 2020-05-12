const router = require('express').Router();

const User = require('../models/User');

router.get('/:id', async (req, res) => {
  let id = req.param.id;
  let u = await User.findOne({_id: id});
  return res.json(u);
});

router.post('/', async (req, res) => {
  const u = req.body;
  if (!u) {
    return res.status(400).send();
  }
  let user = new User({
    name: u.name,
    email: u.email
  });
  user = await user.save();
  return res.json(user);
});

module.exports = router;