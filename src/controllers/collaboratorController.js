const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {userCollaborator, nameCollaborator, emailCollaborator, passwordCollaborator, techLeaderCollaborator} = request.body;
        const idCollaborator = crypto.randomBytes(4).toString('HEX');
        await connection('usersCollaborator').insert({
            idCollaborator,
            userCollaborator,
            nameCollaborator,
            emailCollaborator,
            passwordCollaborator,
            techLeaderCollaborator
        });

        return response.json({idCollaborator});
    },
    async index (request, response){
        const collaborators = await connection('usersCollaborator').select('*');
        return response.json(collaborators);
    },
    async update (request, response){
        const {userCollaborator, nameCollaborator, emailCollaborator, passwordCollaborator, techLeaderCollaborator} = request.body;
        const idCollaborator = request.headers.authorization;
        await connection('usersCollaborator')
        .where({
            idCollaborator: idCollaborator
        })
        .update({
            userCollaborator: userCollaborator,
            nameCollaborator: nameCollaborator,
            emailCollaborator: emailCollaborator,
            passwordCollaborator: passwordCollaborator,
            techLeaderCollaborator: techLeaderCollaborator
        });
        return response.status(200).json({success: 'User updated'});
    },
    async delete (request, response){
        const {idCollaborator} = request.params;
        const logged = request.headers.authorization;
        if(idCollaborator === logged){
            await connection('usersCollaborator')
            .where({
                idCollaborator: idCollaborator
            })
            .delete();
            return response.status(204).send();
        }
        else{
            return response.status(401).json({error: 'Operation not permitted.'});
        }
    }
}