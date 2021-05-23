const express = require('express');
const routes = express.Router();
const adminController = require('./controllers/adminController')
const collaboratorsController = require('./controllers/collaboratorController')
const scoreValueController = require('./controllers/scoreValueController')
const prizeController = require('./controllers/prizeController')
const voucherController = require('./controllers/voucherController')
const scoreController = require('./controllers/scoreController')
const projectController = require('./controllers/projectController')
const sessionController = require('./controllers/sessionController')
const consultScoreController = require('./controllers/consultScoreController')
const pendencyController = require('./controllers/pendencyController')

// Admin's APIs
routes.post('/admin', adminController.create);
routes.get('/admin', adminController.index);
routes.post('/admin/edit', adminController.update);
routes.delete('/admin/:id', adminController.delete);

// Collaborator's APIs
routes.post('/collaborator', collaboratorsController.create);
routes.get('/collaborator', collaboratorsController.index);
routes.post('/collaborator/edit', collaboratorsController.update);
routes.delete('/collaborator/:id', collaboratorsController.delete);

// Score Value's APIs
routes.post('/score-value', scoreValueController.create);
routes.get('/score-value', scoreValueController.index);

// Prize's APIs
routes.post('/prize', prizeController.create);
routes.get('/prize', prizeController.index);
routes.post('/prize/edit', prizeController.update);
routes.post('/prize/:id', prizeController.delete);

// Voucher's APIs
routes.post('/voucher', voucherController.create);
routes.get('/voucher', voucherController.index);
routes.post('/voucher', voucherController.useVoucher)

// Score's APIs
routes.post('/score', scoreController.create);
routes.get('/score', scoreController.index);

// Project's APIs
routes.post('/project', projectController.create);
routes.get('/project', projectController.index);
routes.post('/project/associate', projectController.associate);
routes.get('/project/associate', projectController.association);
routes.post('/project/consultProject', projectController.consultAdminsProject);
routes.post('/project/consultAdmin', projectController.consultProjectAdmin);
routes.post('/project/edit', projectController.update);
routes.delete('/project/:id', projectController.delete);

// Login API
routes.post('/session/admin', sessionController.loginAdmin);
routes.post('/session/collaborator', sessionController.loginCollaborator);

// Dashboard's APIs
routes.post('/dashboard/project', consultScoreController.consultCollaboratorScore);
routes.post('/dashboard/collaborator', consultScoreController.consultProjectScore);

// Pendency's APIs
routes.get('/pendency/user', pendencyController.consultUserPendency);
routes.post('/pendency/approve-user', pendencyController.approveUserPendency);
routes.post('/pendency/decline-user', pendencyController.declineUserPendency);
routes.get('/pendency/commit', pendencyController.consultCommitPendency);
routes.post('/pendency/approve-commit', pendencyController.approveCommitPendency);
routes.post('/pendency/decline-commit', pendencyController.declineCommitPendency);

module.exports = routes;