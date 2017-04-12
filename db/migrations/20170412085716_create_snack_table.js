
exports.up = function(knex) {
  return knex.schema.createTable('snacks',table => {
    table.increments()
    table.string('name').notNullable()
    table.string('creator_company').notNullable()
    table.date('expiration_date').notNullable()
    table.integer('my_rating').notNullable()
    table.text('img_url')
    table.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('snacks')
};
