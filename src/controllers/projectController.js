const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {nameProject, codProject, linkGitProject} = request.body;
        const [id] = await connection('project').insert({
            nameProject,
            codProject,
            linkGitProject
        });

        return response.json({id});
    },
    async index (request, response){
        const projects = await connection('project').select('*');
        return response.json(projects);
    },
    async associate (request, response){
        const {project} = request.body;
        const admin = request.headers.authorization;
        await connection('adminProject').insert({
            project,
            admin
        });
        return response.status(201).send();
    },
    async association (request, response){
        const projects = await connection('adminProject').select('*');
        return response.json(projects);
    }
}