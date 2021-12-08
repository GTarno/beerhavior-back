const connection = require("../database/connection");

module.exports = {
  async consultCollaboratorScore(request, response) {
    const collaborator = request.query.collaborator;
    const score = await connection("score").select("*").where({
      collaborator: collaborator,
    });
    return response.json(score);
  },
  async consultProjectScore(request, response) {
    const project = request.query.project;
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
      return response.status(420).json({ error: "Score not found." });
    }
  },
  async scoreForCode(request, response) {
    const project = request.query.project;
    const score = await connection("score")
      .select(["scoreForCode"])
      .where({ project: project, userApproved: 1, commitApproved: "S" });
    if (score.length > 0) {
      var i = score.length - 1;
      var scoreForCode = 0;
      while (i >= 0) {
        scoreForCode = scoreForCode + score[i].scoreForCode;
        i--;
      }
      return response.json({ scoreForCode: scoreForCode });
    } else {
      return response.status(420).json({ error: "Score not found." });
    }
  },
  async scoreForPratices(request, response) {
    const project = request.query.project;
    const score = await connection("score")
      .select(["scoreForPratices"])
      .where({ project: project, userApproved: 1, commitApproved: "S" });
    if (score.length > 0) {
      var i = score.length - 1;
      var scoreForPratices = 0;
      while (i >= 0) {
        scoreForPratices = scoreForPratices + score[i].scoreForPratices;
        i--;
      }
      return response.json({ scoreForPratices: scoreForPratices });
    } else {
      return response.status(420).json({ error: "Score not found." });
    }
  },
  async scoreForTest(request, response) {
    const project = request.query.project;
    const score = await connection("score")
      .select(["scoreForTest"])
      .where({ project: project, userApproved: 1, commitApproved: "S" });
    if (score.length > 0) {
      var i = score.length - 1;
      var scoreForTest = 0;
      while (i >= 0) {
        scoreForTest = scoreForTest + score[i].scoreForTest;
        i--;
      }
      return response.json({ scoreForTest: scoreForTest });
    } else {
      return response.status(420).json({ error: "Score not found." });
    }
  },
  async scoreForCollaborator(request, response) {
    const project = request.query.project;
    const score = await connection("score")
      .join(
        "usersCollaborator",
        "usersCollaborator.idCollaborator",
        "=",
        "score.collaborator"
      )
      .select([
        "score.collaborator",
        "score.totalScore",
        "usersCollaborator.userCollaborator",
        "usersCollaborator.nameCollaborator",
      ])
      .where({ project: project, userApproved: 1, commitApproved: "S" });
    if (score.length > 0){
      return response.json({
        score
      });
    } else {
      return response.status(420).json({ error: "Score not found." });
    }
  },
};
