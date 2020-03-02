require('dotenv').config();
const express = require('express');

const configureMiddleware = require('./middleware-config.js');
const apiRouter = require('./api-router.js');

const server = express();
configureMiddleware(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.json({ message: "Pintereach is live" });
});

module.exports = server;