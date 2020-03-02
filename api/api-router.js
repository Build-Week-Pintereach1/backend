const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../user/user-router.js');

router.use('/', authRouter);
router.use('/users', userRouter);

module.exports = router;