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
routes.post('/admin/edit', adminController.update); //testado
routes.delete('/admin/:id', adminController.delete); //testado

// Collaborator's APIs
routes.post('/collaborator', collaboratorsController.create); //testado
routes.get('/collaborator', collaboratorsController.index); //testado
routes.post('/collaborator/edit', collaboratorsController.update); //testado
routes.delete('/collaborator/:id', collaboratorsController.delete); //testado

// Score Value's APIs
routes.post('/score-value', scoreValueController.create); //testado
routes.get('/score-value', scoreValueController.index); //testado

// Prize's APIs
routes.post('/prize', prizeController.create); //testado
routes.get('/prize', prizeController.index); //testado
routes.post('/prize/edit', prizeController.update); //testado
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
routes.post('/project/associate', projectController.associate); //testado
routes.get('/project/associate', projectController.association); //testado
routes.post('/project/consultProject', projectController.consultAdminsProject); //testado
routes.post('/project/consultAdmin', projectController.consultProjectAdmin); //testado
routes.post('/project/edit', projectController.update); //testado
routes.delete('/project/:id', projectController.delete); //testado

// Login API
routes.post('/session/admin', sessionController.loginAdmin); //testado
routes.post('/session/collaborator', sessionController.loginCollaborator); //testado

// Dashboard's APIs
routes.post('/dashboard/collaborator', consultScoreController.consultCollaboratorScore); //testado
routes.post('/dashboard/project', consultScoreController.consultProjectScore); //testado

// Pendency's APIs
routes.get('/pendency/user', pendencyController.consultUserPendency); //testado
routes.post('/pendency/approve-user', pendencyController.approveUserPendency); //testado
routes.post('/pendency/decline-user', pendencyController.declineUserPendency); //testado
routes.get('/pendency/commit', pendencyController.consultCommitPendency); //testado
routes.post('/pendency/approve-commit', pendencyController.approveCommitPendency); //testado
routes.post('/pendency/decline-commit', pendencyController.declineCommitPendency); //testado

module.exports = routes;