const db = require('../db/db-config.js');

function getBy(filter) {
  return db('article')
    .where(filter);
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
  update,
  remove
};