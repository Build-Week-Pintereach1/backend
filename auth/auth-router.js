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

module.exports = router;