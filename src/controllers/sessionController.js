const connection = require('../database/connection');
module.exports = {
    async loginAdmin(request, response) {
        const { user, password } = request.body;

        const admin = await connection('usersAdmin')
            .where({
                userAdmin: user,
                passwordAdmin: password,
            })
            .select('*')
            .first();

        if (!admin) {
            return response.status(400).json({ error: 'User not found' });
        }

        return response.json(admin);
    },
    async loginCollaborator(request, response) {
        const { user, password } = request.body;

        const collaborator = await connection('usersCollaborator')
            .where({
                userCollaborator: user,
                passwordCollaborator: password,
            })
            .select('*')
            .first();
        if (!collaborator) {
            return response.status(400).json({ error: 'User not found' });
        }
        return response.json(collaborator);
    }
};