const router = require('express').Router();

const Category = require('./category-model.js');
const Article = require('../article/article-model.js')

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Category.getBy({ user_id: req.auth_id }));
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get categories.', message, stack });
  }
});

router.post('/', validateCategoryInfo, async (req, res) => {
  try {
    req.body.user_id = req.auth_id;
    const [category] = await Category.add(req.body);
    res.status(201).json(category);
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to save board.', message, stack });
  }
})

router.delete('/:id', validateCategoryId, async (req, res) => {
  try {
    await Category.remove(req.category.id);
    res.status(200).json(await Category.getBy({ user_id: req.auth_id }));
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to remove category.', message, stack });
  }
});

router.get('/:id/articles', validateCategoryId, async (req, res) => {
  try {
    const articles = await Category.getArticles(req.category.id);

    if (articles.length === 0) {
      res.status(200).json({ message: 'There are no articles for this category.'});
    } else {
      res.status(200).json(articles);
    }
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to get articles for this category.', message, stack });
  }
});

router.post('/:id/articles', validateCategoryId, validateArticleId, async (req, res) => {
  try {
    if (!req.body || !req.body.article_id) { 
      res.status(400).json({ message: 'Missing field required: article_id.' });
    } else {
      req.body.category_id = req.category.id
      res.status(201).json(await Category.assignCategory(req.body));
    }
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed assign category to article.', message, stack });
  }
});

router.delete('/:id/articles', validateCategoryId, validateArticleId, async (req, res) => {
  try {
    const articles = await Category.removeCategory({ 
      article_id: req.query.artid, category_id: req.category.id 
    });
    res.status(200).json(articles);
  }
  catch ({ message, stack }) {
    res.status(500).json({ error: 'Failed to remove category from article.', message, stack });
  }
});

// // middleware

function validateCategoryId(req, res, next) {
  return Category.getBy({ id: req.params.id, user_id: req.auth_id }).first().then(category => {
    if (!category) {
      res.status(404).json({ message: 'Category with the specified id was not found.' });
    } else {
      req.category = category;
      next();
    }
  });
}

function validateCategoryInfo(req, res, next) {
  if (!req.body || !req.body.name) {
    res.status(400).json({ message: 'Missing required field for category: name.' });
  } else {
    next();
  }
}

function validateArticleId(req, res, next) {
  if (req.method === 'POST') { 
    return Article.getBy({ id: req.body.article_id }).first().then(article => {
      if (!article) {
        res.status(404).json({ message: 'Article with the specified id was not found.' });
      } else {
        req.article = article;
        next();
      }
    });
  } else {
    return Article.getBy({ id: req.query.artid }).first().then(article => {
      if (!article) {
        res.status(404).json({ message: 'Article with the specified id was not found.' });
      } else {
        req.article = article;
        next();
      }
    });
  }
}

module.exports = router;