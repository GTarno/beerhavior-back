const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {scoreForCode, scoreForTest, scoreForPratices, totalScore, dateScore, userApproved, commitCod, commitApproved, given, project} = request.body;
        const collaborator = request.headers.authorization;

        const [id] = await connection('score').insert({
            scoreForCode,
            scoreForTest,
            scoreForPratices,
            totalScore,
            dateScore, 
            userApproved,
            commitCod,
            commitApproved,
            given,
            project,
            collaborator
        });

        return response.json({id});
    },
    async index (request, response){
        const score = await connection('score').select('*');
        return response.json(score);
    }
}