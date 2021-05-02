const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {namePrize, costPrize, availabilityPrize, stockPrize} = request.body;
        const [id] = await connection('prizesTable').insert({
            namePrize,
            costPrize,
            availabilityPrize,
            stockPrize
        });

        return response.json({id});
    },
    async index (request, response){
        const prizes = await connection('prizesTable').select('*');
        return response.json(prizes);
    }
}