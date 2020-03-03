const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../user/user-router.js');
const articleRouter = require('../article/article-router.js');
const boardRouter = require('../board/board-router.js');
const categoryRouter = require('../category/category-router.js');
const { restricted } = require('../auth/auth-helpers.js');

router.use('/', authRouter);
router.use('/users', restricted, userRouter);
router.use('/articles', restricted, articleRouter);
router.use('/boards', restricted, boardRouter);
router.use('/categories', restricted, categoryRouter);

module.exports = router;