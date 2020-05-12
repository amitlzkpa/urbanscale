const router = require('express').Router();

const User = require('../../models/User');

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
  let user = await User.findOne({ username: u.nickname });
  if (user) {
    return res.json(user);
  }
  user = new User({
    username: u.nickname,
    name: u.name,
    email: u.email
  });
  user = await user.save();
  return res.json(user);
});

module.exports = router;