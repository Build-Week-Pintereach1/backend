const db = require('../db/db-config.js');

function getBy(filter) {
  return db('article')
    .where(filter)
}

function add(article) {
  return db('article')
    .insert(article)
    .returning('*');
}

module.exports = {
  getBy,
  add
};