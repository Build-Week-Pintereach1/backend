const db = require('../db/db-config.js');

function getBy(filter) {
  return db('board')
    .where(filter);
}

function getArticles(board_id) {
  return db('board as b')
    .join('article as a', 'b.id', 'a.board_id')
    .select('a.id', 'b.name', 'a.url', 'a.title', 'a.image', 'a.description', 'a.notes')
    .where({ board_id });
}

function add(board) {
  return db('board')
    .insert(board)
    .returning('*');
}

function update(id, changes) {
  return db('board')
    .where({ id })
    .update(changes)
    .returning('*');
}

function remove(id) {
  return db('board')
    .where({ id })
    .del();
}

module.exports = {
  getBy,
  getArticles,
  add,
  update,
  remove
};