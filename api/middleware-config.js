const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const logger = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} to ${req.originalUrl}`);
  next();
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use('/', logger);
};