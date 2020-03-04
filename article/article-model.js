const db = require('../db/db-config.js');

function getBy(filter) {
  return db('article')
    .where(filter);
}

// function getDetails(user_id) {
//   return db('article')
//     .where({ user_id })
//     .then(async articles => {
//       const detailedArticles = await articles.map(async article => {
//         const categories = await db('article_category as ac')
//           .join('category as c', 'c.id', 'ac.category_id')
//           .where({ article_id: article.id })
//           .select('c.name as category_name')
//           .map(record => record.category_name);
        
//         article.categories = categories;
//         console.log(article);
//         // prints out article object with property categories array
//         return article;
//       });
//       console.log(detailedArticles); 
//       // prints array of Promise { <pending> }
//       return detailedArticles;
//     });
// }

function getCategories(article_id) {
  return db('article_category as ac')
    .join('category as c', 'c.id', 'ac.category_id')
    .where({ article_id })
    .select('*')
    .map(record => record.category_name);
}

function getUserCategories(user_id) {
  return db('article_category as ac')
    .join('category as c', 'c.id', 'ac.category_id')
    .join('article as a', 'a.id', 'ac.article_id')
    .where('a.user_id', user_id)
    .select('c.name as category_name', 'a.id as article_id')
}

function getDetails(user_id) {
  const articles = db('article').where({ user_id });
  const categories = getUserCategories(user_id);

  return Promise.all([articles, categories]).then(res => {
    const [articles, categories] = res;

    const detailedArticles = articles.map(article => {
      article.categories = categories
        .filter(tag => tag.article_id === article.id)
        .map(tag => tag.category_name);
      return article;
    });

    return detailedArticles;
  });
}

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
  getCategories,
  getUserCategories,
  getDetails,
  update,
  remove
};