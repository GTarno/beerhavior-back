const connection = require('../database/connection');

module.exports = {
  async consultUserPendency(request, response) {
    const project = request.query.project
    const user = await connection('score')
      .join(
        'usersCollaborator',
        'usersCollaborator.idCollaborator',
        '=',
        'score.collaborator'
      )
      .select([
        'score.collaborator',
        'usersCollaborator.userCollaborator',
        'usersCollaborator.nameCollaborator',
      ]).distinct()
      .where({
        userApproved: 0,
        project: project
      });
    return response.json(user);
  },
  async approveUserPendency(request, response) {
    const { collaborator } = request.body;
    await connection('score')
      .where({
        collaborator: collaborator,
      })
      .update({
        userApproved: 1,
      });
    return response.status(200).json({ Success: 'User approved' });
  },
  async declineUserPendency(request, response) {
    const { collaborator } = request.body;
    await connection('score')
      .where({
        collaborator: collaborator,
      })
      .update({
        userApproved: 0,
      });
    return response.status(200).json({ Success: 'User not approved' });
  },
  async consultCommitPendency(request, response) {
    const project = request.query.project
    const score = await connection('score')
    .join("usersCollaborator", "usersCollaborator.idCollaborator", "=", "score.collaborator")
      .select(["score.totalScore", "score.commitCod", "usersCollaborator.nameCollaborator"]).where({
      commitApproved: null,
      project: project
    });
    return response.json(score);
  },
  async approveCommitPendency(request, response) {
    const { commitCod } = request.body;
    await connection('score')
      .where({
        commitCod: commitCod,
      })
      .update({
        commitApproved: 'S',
      });
      const score = await connection('score')
      .select(['totalScore', 'given', 'userApproved', 'collaborator', 'commitApproved'])
      .where({
        commitCod: commitCod,
      })
      .first();
      if (score.given == 'N' && score.userApproved == '1' && score.commitApproved == 'S') {
        const userScore = await connection('usersCollaborator')
          .select('totalScoreCollaborator')
          .where({
            idCollaborator: score.collaborator,
          })
          .first();
          if(userScore.totalScoreCollaborator == null){
            userScore.totalScoreCollaborator = 0
          }
        const newScore = score.totalScore + userScore.totalScoreCollaborator;
        await connection('usersCollaborator')
          .where({
            idCollaborator: score.collaborator,
          })
          .update({
            totalScoreCollaborator: newScore,
          });
          await connection('score')
          .where({
            commitCod: commitCod
          })
          .update({
            given: 'S'
          });
          return response
          .status(200)
          .json({ success: 'Commit approved and score given' });
      } else {
        return response
        .status(400)
        .json({ error: 'Score already given or commit not approved' });
      }
  },
  async declineCommitPendency(request, response) {
    const { commitCod } = request.body;
    await connection('score')
    .where({
      commitCod: commitCod
    })
    .update({
      commitApproved: 'N'
    });
    return response.status(200).json({ Success: 'Commit not approved' });
  },
  async removeUserFromProject(request, response) {
    const { collaborator, project } = request.body;
    await connection('score')
    .where({
      collaborator: collaborator,
      project: project
    })
    .update({
      userApproved: 0
    }).catch(function (e) {
      if (e.code){
          return response.status(401).json({error: 'User not found'});
      }
    });;
    return response.status(200).json({ Success: 'User removed' });
  }
};
