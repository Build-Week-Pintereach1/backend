const router = require('express').Router();
const User = require('./user-model.js');

router.get('/:id', validateUserId, (req, res) => {
  try {
    const { password, ...noPassword } = req.user;
    res.status(200).json(noPassword);
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get user.', message, stack });
  }
});

// middleware

function validateUserId(req, res, next) {
  return User.getBy({ id: req.params.id }).first().then(user => {
    if (!user) {
      res.status(404).json({ message: 'User with the specified id was not found.' })
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = router;