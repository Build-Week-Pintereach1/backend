
exports.up = function(knex) {
  return knex.schema
  .createTable('category', cat => {
    cat.increments();

    cat
      .string('name')
      .notNullable();

    cat
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('user')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
  .createTable('article_category', ac => {
    ac.primary(['article_id', 'category_id']);
      ac.integer('article_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('article')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      ac.integer('category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('category')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('article_category')
    .dropTableIfExists('category');
};
