const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../user/user-model.js');
const { validateUserInfo, generateToken, verifyToken } = require('./auth-helpers.js');

router.post('/register', validateUserInfo, async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  try {
    const newUser = await User.add(user);
    const token = generateToken(newUser);

    res.status(201).json({
      user: newUser,
      token
    });
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Registration failed.', message, stack });
  }
});

router.post('/login', validateUserInfo, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.getBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome, ${user.username}!`,
        user,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Login failed.', message, stack });
  }
});

router.get('/validate', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).json({ message: 'Token was not provided.' })
  } else {
    try {
      await verifyToken(authorization);
      res.status(200).json({ validToken: true, message: 'Valid token.' });
    }
    catch(err) {
      res.status(401).json({ validToken: false, message: 'Invalid token.' });
    }
  }
});

module.exports = router;