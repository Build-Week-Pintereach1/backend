const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../user/user-model.js');
const { validateUserInfo, generateToken } = require('./auth-helpers.js');

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
    res.status(500).json({error: 'Registration failed.', message, stack });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.getBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome, ${user.username}!`,
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

module.exports = router;