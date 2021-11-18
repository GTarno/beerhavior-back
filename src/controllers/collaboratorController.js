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
        })        
        .catch(function (e) {
            if (e.code){
                return response.status(401).json({error: 'Sorry, user or email already exists.'})
            }
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
        const {id} = request.params;
        const logged = request.headers.authorization;
        if(id == logged){
            await connection('usersCollaborator')
            .where({
                idCollaborator: id
            })
            .delete();
            return response.status(204).send();
        }
        else{
            return response.status(401).json({error: 'Operation not permitted.'});
        }
    },
    async profile (request, response){
        const user = request.query.user;
        console.log(user);
        const collaborators = await connection('usersCollaborator').select('*').where({ idCollaborator: user}).first();
        console.log(collaborators)
        return response.json(collaborators);
    }
}