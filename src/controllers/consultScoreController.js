const connection = require("../database/connection");

module.exports = {
  async consultCollaboratorScore(request, response) {
    const { collaborator } = request.body;
    const score = await connection("score").select("*").where({
      collaborator: collaborator,
    });
    return response.json(score);
  },
  async consultProjectScore(request, response) {
    const { project } = request.body;
    const score = await connection("score").select("*").where({
      project: project,
    });
    return response.json(score);
  },
  async totalProjectScore(request, response) {
    const project = request.query.project;
    const score = await connection("score")
      .select(["totalScore"])
      .where({ project: project, userApproved: 1, commitApproved: "S" });
    if (score.length > 0) {
      var i = score.length - 1;
      var totalScore = 0;
      while (i >= 0) {
        totalScore = totalScore + score[i].totalScore;
        i--;
      }
      return response.json({ totalScore: totalScore });
    } else {
      return response.status(204).json({ error: "Score not found." });
    }
  },
};
