const router = require('express').Router();

const userRouter = require('../user/user-router.js');

router.use('/users', userRouter);

module.exports = router;