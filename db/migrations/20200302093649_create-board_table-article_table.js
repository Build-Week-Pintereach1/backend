
exports.up = function(knex) {
  return knex.schema
    .createTable('board', board => {
      board.increments();

      board
        .string('name')
        .notNullable();
      
      board.text('description');

      board
        .boolean('private')
        .defaultTo(false);
      
      board
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('article', art => {
      art.increments();

      art
        .text('url')
        .notNullable();

      art
        .string('title')
        .notNullable();
      
      art.text('image')

      art.text('description');

      art.text('notes');

      art
        .integer('board_id')
        .unsigned()
        .references('id')
        .inTable('board')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      
      art
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('article')
    .dropTableIfExists('board');
};
