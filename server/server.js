require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const DIR = 'dist';
const PORT = process.env.PORT || 8080;

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;

const app = express();
app.use(express.static(DIR));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/auth0-secrets', function(req, res) {
  let creds = {
    AUTH0_DOMAIN: AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: AUTH0_CLIENT_ID
  };
  res.json(creds);
});

app.get('/api/foo', function(req, res) {
  console.log('foo');
  res.send('bar');
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});