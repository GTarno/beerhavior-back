const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {dateVoucher, availableVoucher, costVoucher, prizeQuantityVoucher, prize} = request.body;
        const voucher = crypto.randomBytes(4).toString('HEX');
        const collaborator = request.headers.authorization;

        await connection('voucher').insert({
            voucher,
            dateVoucher,
            availableVoucher,
            costVoucher,
            prizeQuantityVoucher,
            prize,
            collaborator
        });

        return response.json({voucher});
    },
    async index (request, response){
        const vouchers = await connection('voucher').select('*');
        return response.json(vouchers);
    }
}