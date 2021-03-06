exports.up = function(knex) {
    return knex.schema.createTable('usersCollaborator', function(table) {
        table.string('idCollaborator').primary();
        table.string('userCollaborator').unique().notNullable();
        table.string('nameCollaborator').notNullable();
        table.string('emailCollaborator').unique().notNullable();
        table.string('passwordCollaborator').notNullable();
        table.boolean('techLeaderCollaborator').notNullable();
        table.integer('totalScoreCollaborator');
        table.string('imageCollaborator');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usersCollaborator');
};