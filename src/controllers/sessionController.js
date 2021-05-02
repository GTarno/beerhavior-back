const connection = require("../database/connection");
module.exports = {
    async create(request, response) {
        const { user, password } = request.body;

        const admin = await connection("usersAdmin")
            .where({
                userAdmin: user,
                passwordAdmin: password,
            })
            .select("*")
            .first();

        if (!admin) {
            const collaborator = await connection("usersCollaborator")
                .where({
                    userCollaborator: user,
                    passwordCollaborator: password,
                })
                .select("*")
                .first();
            if (!admin && !collaborator) {
                return response.status(400).json({ error: "User not found" });
            }
            return response.json(collaborator);
        }
        return response.json(admin);
    },
};