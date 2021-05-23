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
    },
    async update (request, response){
        const {idPrize, namePrize, costPrize, availabilityPrize, stockPrize} = request.body;
        await connection('prizesTable')
            .where({
                idPrize: idPrize
            })
            .update({
                namePrize: namePrize,
                costPrize: costPrize,
                availabilityPrize: availabilityPrize,
                stockPrize: stockPrize
            });
            return response.status(200).json({success: 'Prize updated'});
    },
    async delete (request, response){
        const {idPrize} = request.params;
        await connection('prizesTable')
            .where({
                idPrize: idPrize
            })
            .delete();
            return response.status(204).send();
    }
}