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
    }
}