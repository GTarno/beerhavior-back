exports.up = function(knex) {
    return knex.schema.createTable('project', function(table) {
        table.increments('idProject');
        table.string('nameProject').notNullable();
        table.string('codProject').unique().notNullable();
        table.string('linkGitProject').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('project');
};