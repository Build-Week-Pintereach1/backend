
exports.up = function(knex) {
  return knex.schema.createTable('user', user => {
    user
      .increments('id')
      .primary();

    user
      .string('username', 128)
      .notNullable()
      .unique();
    
    user
      .string('password', 128)
      .notNullable();
      
    user
      .string('email', 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};