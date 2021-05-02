
exports.up = function(knex) {
    return knex.schema.createTable('prizesTable', function(table){
         table.increments('idPrize');
         table.string('namePrize').notNullable();
         table.integer('costPrize').notNullable();
         table.boolean('availabilityPrize').notNullable();
         table.integer('stockPrize').notNullable();
     });
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable('prizesTable');
 };
 