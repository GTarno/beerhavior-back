exports.up = function(knex) {
    return knex.schema.createTable('voucher', function(table) {
        table.increments('idVoucher');
        table.string('voucher').unique().notNullable();
        table.date('dateVoucher').notNullable();
        table.boolean('availableVoucher').notNullable();
        table.integer('costVoucher').notNullable();
        table.integer('prizeQuantityVoucher').notNullable();

        table.integer('prize').notNullable();
        table.string('collaborator').notNullable();

        table.foreign('prize').references('idPrize').inTable('prizesTable');
        table.foreign('collaborator').references('idCollaborator').inTable('usersCollaborator');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('voucher');
};