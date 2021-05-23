const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {dateVoucher, availableVoucher, costVoucher, prizeQuantityVoucher, prize} = request.body;
        const voucher = crypto.randomBytes(4).toString('HEX');
        const collaborator = request.headers.authorization;

        const selectedPrize = await connection('prizesTable')
        .select({
            stockPrize
        })
        .where({
            idPrize: prize
        });
        
        if (prizeQuantityVoucher <= selectedPrize){
            const updatePrize = prize - prizeQuantityVoucher
            await connection('prizesTable')
            .where({
                idPrize: prize
            })
            .update({
                stockPrize: updatePrize
            });
            await connection('voucher').insert({
                voucher,
                dateVoucher,
                availableVoucher,
                costVoucher,
                prizeQuantityVoucher,
                prize,
                collaborator
            });
            this.getNewScore (collaborator, costVoucher)
            return response.json({voucher});
    }
        else{
            return response.status(400).json({ error: 'Prize quantity not permitted' });
        }
    },
    async index (request, response){
        const vouchers = await connection('voucher').select('*');
        return response.json(vouchers);
    },
    async getNewScore (user, score){
        const totalScore = await connection('usersCollaborator')
        .select('totalScoreCollaborator')
        .where({
            userCollaborator: user
        });
        const newScore = totalScore - score;
        this.updateScore(newScore, user);
    },
    async updateScore (score, user) {
        await connection('usersCollaborator')
        .where({
            userCollaborator: user
        })
        .update({
            totalScoreCollaborator: score
        })
    },
    async useVoucher (request, response){
        const {voucher} = request.body;
        const voucherAvailability = await connection('voucher')
        .select('availableVoucher')
        .where({
            voucher: voucher
        });
        if (voucherAvailability === 0) {
            return response.status(400).json({ error: 'Voucher unavailable' });
        }
        else{
        await connection('voucher')
        .where({
            voucher: voucher
        })
        .update({
            availableVoucher: 0
        });
        return response.status(201).send();
     }
    }
}