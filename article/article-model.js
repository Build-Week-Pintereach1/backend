const db = require('../db/db-config.js');

function getBy(filter) {
  return db('article')
    .where(filter);
}

function getDetails(user_id) {
  return db('article')
    .where({ user_id })
    .then(async articles => {
      const detailedArticles = await articles.map(async article => {
        const categories = await db('article_category as ac')
          .join('category as c', 'c.id', 'ac.category_id')
          .where({ article_id: article.id })
          .select('c.name as category_name')
          .map(record => record.category_name);
        
        article.categories = categories;
        console.log(article);
        // prints out article object with property categories array
        return article;
      });
      console.log(detailedArticles); 
      // prints array of Promise { <pending> }
      return detailedArticles;
    });
}

      // articles.map(article => {
      //   return db('article_category as ac')
      //     .join('category as c', 'c.id', 'ac.category_id')
      //     .join('article as a', 'a.id', 'ac.article_id')
      //     .where({ article_id: article.id })
      //     .select('c.name as category_name')
      //     .then(categories => {
      //       article.categories = categories.map(record => record.category_name);
      //       return article;
      //     })
      //     .then(articles => articles);

      //   article.categories = categories.map(record => record.category_name);
      //   // console.log(article);
      //   return article;
      // })

function add(article) {
  return db('article')
    .insert(article)
    .returning('*');
}

function update(id, changes) {
  return db('article')
    .where({ id })
    .update(changes)
    .returning('*');
}

function remove(id) {
  return db('article')
    .where({ id })
    .del();
}

module.exports = {
  getBy,
  add,
  getDetails,
  update,
  remove
};