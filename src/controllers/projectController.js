const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { nameProject, codProject, linkGitProject } = request.body;
    const [id] = await connection("project")
      .insert({
        nameProject,
        codProject,
        linkGitProject,
      })
      .catch(function (e) {
        if (e.code) {
          return response
            .status(401)
            .json({ error: "Sorry, project code already exists." });
        }
      });
    return response.json({ id });
  },
  async index(request, response) {
    const projects = await connection("project").select("*");
    return response.json(projects);
  },
  async associate(request, response) {
    const { project } = request.body;
    const admin = request.headers.authorization;
    await connection("adminProject").insert({
      project,
      admin,
    });
    return response.status(201).send();
  },
  async association(request, response) {
    const projects = await connection("adminProject").select("*");
    return response.json(projects);
  },
  async consultProjectAdmin(request, response) {
    const project = request.query.codProject;
    const admin = await connection("adminProject")
      .join("usersAdmin", "usersAdmin.idAdmin", "=", "adminProject.admin")
      .select(["adminProject.admin", "usersAdmin.nameAdmin"])
      .where({
        project: project,
      });
      if (admin.length > 0) {
        return response.json(admin);
      } else {
        return response.status(204).json({ error: "No users were found." });
      }
  },
  async consultAdminsProject(request, response) {
    const admin = request.query.codAdmin;
    const project = await connection("adminProject")
      .join("project", "project.idProject", "=", "adminProject.project")
      .select(["adminProject.admin", "project.nameProject"])
      .where({
        admin: admin,
      });
      if (project.length > 0) {
        return response.json(project);
      } else {
        return response.status(204).json({ error: "No projects were found." });
      }
  },
  async consultProjectsColaborators(request, response) {
    const project = request.query.codProject;
    const collaborator = await connection("score")
      .join(
        "usersCollaborator",
        "usersCollaborator.idCollaborator",
        "=",
        "score.collaborator"
      )
      .select([
        "usersCollaborator.nameCollaborator",
        "score.collaborator",
        "score.project",
      ])
      .distinct()
      .where({
        project: project,
      });
    if (collaborator.length > 0) {
      return response.json(collaborator);
    } else {
      return response.status(204).json({ error: "No users were found." });
    }
  },
  async consultColaboratorsProjects(request, response) {
    const collaborator = request.query.codCollaborator;
    const project = await connection("score")
      .join("project","project.idProject","=","score.project")
      .select([
        "project.nameProject",
        "score.collaborator",
        "score.project",
      ])
      .distinct()
      .where({
        collaborator: collaborator,
      });
    if (project.length > 0) {
      return response.json(project);
    } else {
      return response.status(204).json({ error: "No projects were found." });
    }
  },
  async update(request, response) {
    const { idProject, nameProject, codProject, linkGitProject } = request.body;
    const idAdmin = request.headers.authorization;
    const project = await connection("adminProject")
      .where({
        admin: idAdmin,
        project: idProject,
      })
      .select("*")
      .first();
    if (project) {
      await connection("project")
        .where({
          idProject: idProject,
        })
        .update({
          nameProject: nameProject,
          codProject: codProject,
          linkGitProject: linkGitProject,
        });
      return response.status(200).json({ success: "Project updated" });
    } else {
      return response.status(401).json({ error: "Operation not permitted." });
    }
  },
  async delete(request, response) {
    const { id } = request.params;
    const idAdmin = request.headers.authorization;
    const project = await connection("adminProject")
      .where({
        admin: idAdmin,
        project: id,
      })
      .select("*")
      .first();
    if (project) {
      await connection("project")
        .where({
          idProject: id,
        })
        .delete();
      await connection("adminProject")
        .where({
          project: id,
        })
        .delete();
      return response.status(204).send();
    } else {
      return response.status(401).json({ error: "Operation not permitted." });
    }
  },

  async getById(request, response) {
    const { codProject } = request.params;
    const project = await connection("project")
      .where({
        codProject: codProject,
      })
      .select("*")
      .first();
    if (project) {
      return response.status(200).json(project);
    } else {
      return response.status(401).json({ error: "Project Not Found." });
    }
  },
};
