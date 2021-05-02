
exports.up = function(knex) {
   return knex.schema.createTable('usersAdmin', function(table){
        table.string('idAdmin').primary();
        table.string('userAdmin').notNullable();
        table.string('nameAdmin').notNullable();
        table.string('emailAdmin').notNullable();
        table.string('passwordAdmin').notNullable();
        table.string('imageAdmin');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usersAdmin');
};
