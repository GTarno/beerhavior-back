
exports.up = function(knex) {
    return knex.schema.createTable('score', function(table){
         table.increments('idScore');
         table.integer('scoreForCode');
         table.integer('scoreForTest');
         table.integer('scoreForPratices');
         table.integer('totalScore');
         table.date('dateScore');
         table.boolean('userApproved').notNullable();
         table.string('commitCod');
         table.string('commitApproved');
         table.string('given');

         table.integer('project');
         table.string('collaborator');

         table.foreign('project').references('idProject').inTable('project');
         table.foreign('collaborator').references('idCollaborator').inTable('usersCollaborator');
     });
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable('score');
 };
 