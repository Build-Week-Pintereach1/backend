const Article = require('./article-model.js');

// middleware

function validateArticleId(req, res, next) {
  return Article.getBy({ id: req.params.id }).first().then(article => {
    if (!article) {
      res.status(404).json({ message: 'Article with the specified id was not found.' });
    } else {
      req.article = article;
      next();
    }
  });
}

function validateAccess(req, res, next) {
  if (req.article.user_id !== req.auth_id) {
    res.status(403).json({ message: 'You are not authorized to access this resource.' });
  } else {
    next();
  }
}

function validateArticleInfo(req, res, next) {
  if (!req.body || !req.body.url) {
    res.status(400).json({ message: 'Missing required field: url.' });
  } else {
    next();
  }
}

module.exports = {
  validateArticleId,
  validateAccess,
  validateArticleInfo
};