const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {scoreForCode, scoreForTest, scoreForPratices, totalScore, dateScore, userApproved, commitCod, commitApproved, given, project} = request.body;
        console.log(request.body)
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
        }) .catch(function (e) {
            if (e.code){
                console.error(e)
                return response.status(500).json({error: 'Something went wrong'})
            }
          });

        return response.json({id});
    },
    async index (request, response){
        const score = await connection('score').select('*');
        return response.json(score);
    }   
}