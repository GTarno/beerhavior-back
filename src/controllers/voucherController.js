const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const {
      dateVoucher,
      availableVoucher,
      costVoucher,
      prizeQuantityVoucher,
      prize,
    } = request.body;
    const voucher = crypto.randomBytes(4).toString("HEX");
    const collaborator = request.headers.authorization;

    const selectedPrize = await connection("prizesTable")
      .select("stockPrize")
      .where({
        idPrize: prize,
      })
      .first();

    const collaboratorScore = await connection("usersCollaborator")
      .select("totalScoreCollaborator")
      .where({
        idCollaborator: collaborator,
      })
      .first();
    console.log(collaboratorScore.totalScoreCollaborator);
    console.log(costVoucher);
    console.log(selectedPrize.stockPrize);
    console.log(collaboratorScore.totalScoreCollaborator);
    console.log(prizeQuantityVoucher);
    console.log(prizeQuantityVoucher <= selectedPrize.stockPrize);
    if (
      collaboratorScore.totalScoreCollaborator >= costVoucher &&
      prizeQuantityVoucher <= selectedPrize.stockPrize
    ) {
      const updatePrize = selectedPrize.stockPrize - prizeQuantityVoucher;
      console.log(updatePrize);
      await connection("prizesTable")
        .where({
          idPrize: prize,
        })
        .update({
          stockPrize: updatePrize,
        });
      await connection("voucher").insert({
        voucher,
        dateVoucher,
        availableVoucher,
        costVoucher,
        prizeQuantityVoucher,
        prize,
        collaborator,
      });
      const totalScore = await connection("usersCollaborator")
        .select("totalScoreCollaborator")
        .where({
          idCollaborator: collaborator,
        })
        .first();
      console.log(totalScore.totalScoreCollaborator);
      const newScore = totalScore.totalScoreCollaborator - costVoucher;
      await connection("usersCollaborator")
        .where({
          idCollaborator: collaborator,
        })
        .update({
          totalScoreCollaborator: newScore,
        });

      return response.json({ voucher });
    } else {
      return response
        .status(400)
        .json({ error: "Prize quantity not permitted" });
    }
  },
  async index(request, response) {
    const vouchers = await connection("voucher").select("*");
    return response.json(vouchers);
  },

  async getVoucherByUser(request, response) {
    const {collaborator} = request.body;
    console.log(request.body);
    console.log(collaborator);
    const vouchers = await connection("voucher").select("*").where({
      collaborator: collaborator,
    });
    if (vouchers.length > 0) {
      return response.json(vouchers);
    } else {
      return response.status(400).json({ error: "Voucher not found" });
    }
  },

  async useVoucher(request, response) {
    const { voucher } = request.body;
    const voucherAvailability = await connection("voucher")
      .select("availableVoucher")
      .where({
        voucher: voucher,
      })
      .first();
    if (voucherAvailability.availableVoucher == 0) {
      return response.status(400).json({ error: "Voucher unavailable" });
    } else {
      await connection("voucher")
        .where({
          voucher: voucher,
        })
        .update({
          availableVoucher: 0,
        });
      return response.status(201).send();
    }
  },
};
