const bcrypt = require('bcryptjs');

const hash1 = bcrypt.hashSync(process.env.USER_1, 12);
const hash2 = bcrypt.hashSync(process.env.USER_2, 12);

exports.seed = function(knex) {
  return knex('user').insert([
    { id: 1, username: 'lily', password: hash1, email: 'lily@gmail.com' },
    { id: 2, username: 'aaron', password: hash2, email: 'aaron@gmail.com' },
  ]);
};
