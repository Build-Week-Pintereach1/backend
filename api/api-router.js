const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../user/user-router.js');
const { restricted } = require('../auth/auth-helpers.js');

router.use('/', authRouter);
router.use('/users', restricted, userRouter);

module.exports = router;