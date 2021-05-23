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
    },
    async consultProjectAdmin (request, response){
        const {project} = request.body;
        const admin = await connection('adminProject').where({
            project: project
        })
        .select('admin');
        return response.json(admin);
    },
    async consultAdminsProject (request, response){
        const {admin} = request.body;
        const project = await connection('adminProject').where({
            admin: admin,
        })
        .select('project');
        return response.json(project);
    },
    async update (request, response){
        const {idProject,nameProject, codProject, linkGitProject} = request.body;
        const idAdmin = request.headers.authorization;
        const project = await connection('adminProject')
        .where({
            admin: idAdmin,
            project: idProject
        })
        .select('*')
        if (project){
            await connection('project')
            .where({
                idProject: idProject
            })
            .update({
                nameProject: nameProject,
                codProject: codProject,
                linkGitProject: linkGitProject
            });
            return response.status(200).json({success: 'Project updated'});
        }
        else{
            return response.status(401).json({error: 'Operation not permitted.'});
        }
    },
    async delete (request, response){
        const {idProject} = request.params;
        const idAdmin = request.headers.authorization;
        const project = await connection('adminProject')
        .where({
            admin: idAdmin,
            project: idProject
        })
        .select('*')
        if (project){
            await connection('project')
            .where({
                idProject: idProject
            })
            .delete();
            return response.status(204).send();
        }
        else{
            return response.status(401).json({error: 'Operation not permitted.'});
        }
    }
}