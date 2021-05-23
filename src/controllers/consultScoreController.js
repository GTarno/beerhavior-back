const connection = require('../database/connection');

module.exports = {
    async consultCollaboratorScore (request, response){
        const {collaborator} = request.body;
        const score = await connection('score') 
        .select('*')
        .where({
            collaborator: collaborator
        });;
        return response.json(score);
    },
    async consultProjectScore (request, response){
        const {project} = request.body;
        const score = await connection('score') 
        .select('*')
        .where({
            project: project
        });;
        return response.json(score);
    }
}