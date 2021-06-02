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
        })
        .catch(function (e) {
            console.log(e)
            if (e.code){
                return response.status(401).json({error: 'Sorry, user or email already exists.'})
            }
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
        const {id} = request.params;
        const logged = request.headers.authorization;
        if(id == logged){
            await connection('usersAdmin')
            .where({
                idAdmin:id
            })
            .delete();
            return response.status(204).send();
        }
        else{
            return response.status(401).json({error: 'Operation not permitted.'});
        }
    }
}