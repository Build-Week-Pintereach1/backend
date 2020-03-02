const db = require('../db/db-config.js');

function getBy(filter) {
  return db('user')
    .where(filter)
}

async function add(user) {
  const [id] = await db('user')
    .insert(user)
    .returning('id');
  
  return getBy({ id }).first();
}

module.exports = {
  getBy,
  add
};