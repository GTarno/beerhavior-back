const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {typeScoreValue, valueScoreValue} = request.body;
        const [id] = await connection('scoreValue').insert({
            typeScoreValue,
            valueScoreValue
        });

        return response.json({id});
    },
    async index (request, response){
        const scoresValue = await connection('scoreValue').select('*');
        return response.json(scoresValue);
    }
}