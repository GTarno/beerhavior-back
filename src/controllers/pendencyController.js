const connection = require('../database/connection');

module.exports = {
  async consultUserPendency(request, response) {
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
      ])
      .where({
        userApproved: 0,
      });
    return response.json(user);
  },
  async approveUserPendency(request, response) {
    const { user } = request.body;
    await connection('score')
      .where({
        collaborator: user,
      })
      .update({
        userApproved: 'S',
      });
    return response.status(200).json({ Success: 'User approved' });
  },
  async declineUserPendency(request, response) {
    const { user } = request.body;
    await connection('score')
      .where({
        collaborator: user,
      })
      .update({
        userApproved: 'N',
      });
    return response.status(200).json({ Success: 'User not approved' });
  },
  async consultCommitPendency(request, response) {
    const score = await connection('score').select('*').where({
      commitApproved: 0,
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
    if (this.updateScore(commitCod).true) {
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
        commitCod: commitCod,
      })
      .update({
        commitApproved: 'N',
      });
    return response.status(200).json({ Success: 'Commit not approved' });
  },
  async updateScore(commitCod) {
    const score = await connection('score')
      .select(['totalScore', 'given', 'userApproved', 'collaborator', 'commitApproved'])
      .where({
        commitCod: commitCod,
      });
    if (score.given === 'N' && score.userApproved === 'S' && score.commitApproved === 'S') {
      const userScore = await connection('usersCollaborator')
        .select('totalScoreCollaborator')
        .where({
          idCollaborator: score.collaborator,
        });
      const newScore = score.totalScore + userScore;
      await connection('usersCollaborator')
        .where({
          idCollaborator: score.collaborator,
        })
        .update({
          totalScoreCollaborator: newScore,
        });
      return true;
    } else {
      return false;
    }
  },
};
