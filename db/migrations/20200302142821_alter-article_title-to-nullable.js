
exports.up = function(knex) {
  return knex.schema.alterTable('article', art => {
    art
      .string('title')
      .notNullable()
      .alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('article', art => {
    art
      .string('title')
      .nullable()
      .alter();
  });
};
