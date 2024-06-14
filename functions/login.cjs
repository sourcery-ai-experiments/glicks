const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(json());

const USERNAME = process.env.USERNAME || 'admin';
const PASSWORD = process.env.PASSWORD || 'password';
const TOKEN = process.env.TOKEN || 'simple-token';

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    res.status(200).json({ token: TOKEN });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports.handler = serverless(app);
