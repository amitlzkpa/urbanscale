const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads')
  },
  filename: function (req, file, cb) {
    let split = file.originalname.split('.');
    let fName = split.slice(0, split.length-1).reduce((a, b) => { return `${a}.${b}` });
    let fExt = split[split.length-1];
    cb(null, `${fName}-${Date.now()}.${fExt}`)
  }
})
const upload = multer({ storage: storage });

router.post('/', async (req, res) => {
  const data = req.body;
  console.log(data);
  return res.json(data);
});

router.post('/:id/image/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  console.log(file.filename);
  return res.json(file.filename);
});

module.exports = router;