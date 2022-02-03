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
routes.post('/admin', adminController.create); //testado
routes.get('/admin', adminController.index); //testado
routes.put('/admin', adminController.update); //testado
routes.delete('/admin/:id', adminController.delete); //testado
routes.get('/admin/profile', adminController.profile); //testado 

// Collaborator's APIs
routes.post('/collaborator', collaboratorsController.create); //testado
routes.get('/collaborator', collaboratorsController.index); //testado
routes.put('/collaborator', collaboratorsController.update); //testado
routes.delete('/collaborator/:id', collaboratorsController.delete); //testado
routes.get('/collaborator/profile', collaboratorsController.profile) ; //testado
routes.get('/collaborator/profile-user', collaboratorsController.getProfileByUser) ; //testado

// Score Value's APIs
routes.post('/score-value', scoreValueController.create); //testado
routes.get('/score-value', scoreValueController.index); //testado

// Prize's APIs
routes.post('/prize', prizeController.create); //testado
routes.get('/prize', prizeController.index); //testado
routes.put('/prize', prizeController.update); //testado
routes.delete('/prize/:id', prizeController.delete); //testado

// Voucher's APIs
routes.post('/voucher', voucherController.create); //testado
routes.get('/voucher', voucherController.index); //testado
routes.post('/voucher/get-by-user', voucherController.getVoucherByUser); //testado
routes.post('/voucher/use-voucher', voucherController.useVoucher) //testado

// Score's APIs
routes.post('/score', scoreController.create); //testado
routes.get('/score', scoreController.index); //testado

// Project's APIs
routes.post('/project', projectController.create); //testado
routes.get('/project', projectController.index); //testado
routes.put('/project', projectController.update); //testado
routes.delete('/project/:id', projectController.delete); //testado
routes.post('/project/associate', projectController.associate); //testado
routes.get('/project/associate', projectController.association); //testado
routes.get('/project/consultProject', projectController.consultAdminsProject); //testado
routes.get('/project/consultAdmin', projectController.consultProjectAdmin); //testado
routes.get('/project/consultColaborator', projectController.consultProjectsColaborators); //testado
routes.get('/project/consultColaboratorProject', projectController.consultColaboratorsProjects); //testado
routes.get('/project/:codProject', projectController.getById); //testado

// Login API
routes.post('/session/admin', sessionController.loginAdmin); //testado
routes.post('/session/collaborator', sessionController.loginCollaborator); //testado

// Dashboard's APIs
routes.get('/dashboard/collaborator', consultScoreController.consultCollaboratorScore); //testado
routes.get('/dashboard/project', consultScoreController.consultProjectScore); //testado
routes.get('/dashboard/project/total-score', consultScoreController.totalProjectScore); //testado
routes.get('/dashboard/project/code-score', consultScoreController.scoreForCode); //testado
routes.get('/dashboard/project/pratices-score', consultScoreController.scoreForPratices); //testado
routes.get('/dashboard/project/test-score', consultScoreController.scoreForTest); //testado
routes.get('/dashboard/project/total-collaborator', consultScoreController.scoreForCollaborator); //testado



// Pendency's APIs
routes.get('/pendency/user', pendencyController.consultUserPendency); //testado
routes.post('/pendency/approve-user', pendencyController.approveUserPendency); //testado
routes.post('/pendency/decline-user', pendencyController.declineUserPendency); //testado
routes.get('/pendency/commit', pendencyController.consultCommitPendency); //testado
routes.post('/pendency/approve-commit', pendencyController.approveCommitPendency); //testado
routes.post('/pendency/decline-commit', pendencyController.declineCommitPendency); //testado
routes.post('/pendency/remove-collaborator', pendencyController.removeUserFromProject); //testado

module.exports = routes;