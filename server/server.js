require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const DIR = 'dist';
const PORT = process.env.PORT || 8080;

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;

const mongoURI = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@cluster0-ju8ei.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, { useNewUrlParser: true });

const app = express();
app.use(express.static(DIR));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/auth0-secrets', function(req, res) {
  const creds = {
    AUTH0_DOMAIN: AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: AUTH0_CLIENT_ID
  };
  res.json(creds);
});

app.use('/api/users', routes.user);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});