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
    },
    async update (request, response){
        const {userAdmin, nameAdmin, emailAdmin, passwordAdmin} = request.body;
        const idAdmin = request.headers.authorization;
        await connection('usersAdmin')
        .where({
            idAdmin:idAdmin
        })
        .update({
            userAdmin: userAdmin,
            nameAdmin: nameAdmin,
            emailAdmin: emailAdmin,
            passwordAdmin: passwordAdmin
        });
        return response.status(200).json({success: 'User updated'});
    },
    async delete (request, response){
        const {idAdmin} = request.params;
        const logged = request.headers.authorization;
        if(idAdmin === logged){
            await connection('usersAdmin')
            .where({
                idAdmin:idAdmin
            })
            .delete();
            return response.status(204).send();
        }
        else{
            return response.status(401).json({error: 'Operation not permitted.'});
        }
    }
}