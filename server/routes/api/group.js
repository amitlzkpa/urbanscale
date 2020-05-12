const router = require('express').Router();

router.post('/', async (req, res) => {
  const data = req.body;
  console.log(data);
  return res.json(data);
});

module.exports = router;