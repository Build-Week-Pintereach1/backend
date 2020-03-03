const db = require('../db/db-config.js');

function getBy(filter) {
  return db('category')
    .where(filter);
}

function getArticles(category_id) {
  return db('article_category as ac')
    .join('category as c', 'c.id', 'ac.category_id')
    .join('article as a', 'a.id', 'ac.article_id')
    .where({ category_id })
    .select(
      'c.name as category_name', 
      'a.id as article_id', 'a.url', 'a.title', 'a.image', 'a.description', 'a.notes'
    );
}

function add(category) {
  return db('category')
    .insert(category)
    .returning('*');
}

async function assignCategory({ article_id, category_id }) {
  const [cat_id] = await db('article_category')
    .insert({ article_id, category_id })
    .returning('category_id');

  return getArticles(cat_id);
}

function update(id, changes) {
  return db('board')
    .where({ id })
    .update(changes)
    .returning('*');
}

function remove(id) {
  return db('category')
    .where({ id })
    .del();
}

async function removeCategory({ article_id, category_id }) {
  await db('article_category').where({ article_id, category_id }).del();

  return getArticles(category_id);
}

module.exports = {
  getBy,
  getArticles,
  add,
  assignCategory,
  update,
  remove,
  removeCategory
};