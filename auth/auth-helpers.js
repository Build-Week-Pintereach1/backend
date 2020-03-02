require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

function generateToken(user) {
  const payload = {
    sub: user.id
  };

  const options = {
    expiresIn: '3h'
  };

  return jwt.sign(payload, jwtSecret, options);
}

// middleware

function validateUserInfo(req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400).json({ message: 'Missing required fields.' })
  } else {
    next();
  }
}

module.exports = {
  generateToken,
  validateUserInfo
};