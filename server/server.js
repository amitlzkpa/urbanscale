require('dotenv').config();
const express = require('express');

const DIR = 'dist';
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(DIR));

app.get('/api/foo', function(req, res) {
  console.log('foo');
  res.send('bar');
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});