
exports.seed = function(knex) {
  return knex('board').insert([
    { name: 'Learning Full-Stack', description: 'Front-end and back-end.', user_id: '1' },
    { name: 'Cooking Hub', description: 'Recipes to try.', user_id: '2' },
    { name: 'Website Inspiration', private: true, user_id: '1' }
  ]);
};
