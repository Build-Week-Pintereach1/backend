const router = require('express').Router();
const axios = require('axios');

const Article = require('./article-model.js');
const { validateArticleId, validateAccess, validateArticleInfo } = require('./article-helpers.js');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Article.getDetails(req.auth_id));
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get articles.', message, stack });
  }
});

router.get('/:id', validateArticleId, validateAccess, async (req, res) => {
  try {
    res.status(200).json(await Article.getBy({ id: req.params.id }));
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get article by id.', message, stack });
  }
});

router.post('/', validateArticleInfo, async (req, res) => {
  try {
    const { data } = await axios
      .get(`http://api.linkpreview.net/?key=${process.env.API_KEY}&q=${req.body.url}`);
    let send = {};

    if (data.error) {
      send.message = 'Link preview could not be generated.'
    } else {
      req.body.title = data.title;
      req.body.description = data.description;
      req.body.image = data.image;
    }

    req.body.user_id = req.auth_id;
    await Article.add(req.body);
    send.articles = await Article.getDetails(req.auth_id);

    res.status(200).json(send);
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to save article.', message, stack });
  }
})

router.put('/:id', validateArticleId, validateAccess, async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'No changes were provided.' })
    } else {
      res.status(200).json(await Article.update(req.params.id, req.body));
    }
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to update article.', message, stack });
  }
});

router.delete('/:id', validateArticleId, validateAccess, async (req, res) => {
  try {
    await Article.remove(req.params.id);
    res.status(200).json(await Article.getDetails(req.auth_id));
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to remove article.', message, stack });
  }
});

module.exports = router;