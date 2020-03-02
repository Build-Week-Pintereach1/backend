require('dotenv').config();
const express = require('express');

const configureMiddleware = require('./middleware-config.js');

const server = express();
configureMiddleware(server);

server.get('/', (req, res) => {
  res.json({ message: "Pintereach is live" });
});

module.exports = server;