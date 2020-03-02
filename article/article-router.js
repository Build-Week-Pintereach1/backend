const router = require('express').Router();
const axios = require('axios');

const Article = require('./article-model.js');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Article.getBy({ user_id: req.auth_id }));
  }
  catch ({ message, stack }) {
    res.status(500).json({ message, stack });
  }
});

router.post('/', validateArticleInfo, async (req, res) => {
  try {
    const { data } = await axios.get(`http://api.linkpreview.net/?key=${process.env.API_KEY}&q=${req.body.url}`);
    let send = {};

    if (data.error) {
      send.message = 'Link preview could not be generated.'
    } else {
      req.body.title = data.title;
      req.body.description = data.description;
      req.body.image = data.image;
    }

    req.body.user_id = req.auth_id;
    const [newArticle] = await Article.add(req.body);
    send.article = newArticle;

    res.status(200).json(send);
  }
  catch ({ message, stack }) {
    res.status(500).json({ message, stack });
  }
})

function validateArticleInfo(req, res, next) {
  if (!req.body.url) {
    res.status(400).json({ message: 'Missing required field: url.' })
  } else {
    next();
  }
}

module.exports = router;