const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.json({ message: "Pintereach is live" });
});

module.exports = server;