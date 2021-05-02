
exports.up = function(knex) {
    return knex.schema.createTable('scoreValue', function(table){
         table.increments('idScoreValue');
         table.string('typeScoreValue').notNullable();
         table.integer('valueScoreValue').notNullable();
     });
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable('scoreValue');
 };
 