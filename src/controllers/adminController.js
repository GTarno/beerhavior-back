const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {userAdmin, nameAdmin, emailAdmin, passwordAdmin} = request.body;
        const idAdmin = crypto.randomBytes(4).toString('HEX');
        await connection('usersAdmin').insert({
            idAdmin,
            userAdmin,
            nameAdmin,
            emailAdmin,
            passwordAdmin
        });

        return response.json({idAdmin});
    },
    async index (request, response){
        const admins = await connection('usersAdmin').select('*');
        return response.json(admins);
    }
}