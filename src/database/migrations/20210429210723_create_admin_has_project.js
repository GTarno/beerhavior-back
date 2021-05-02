
exports.up = function(knex) {
    return knex.schema.createTable('adminProject', function(table){
        table.integer('project').notNullable();
        table.string('admin').notNullable();
        
        table.foreign('project').references('idProject').inTable('project');
        table.foreign('admin').references('idAdmin').inTable('usersAdmin');
     });
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable('adminProject');
 };
 