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


// Admin's APIs
routes.post('/admin', adminController.create);
routes.get('/admin', adminController.index);

// Collaborator's APIs
routes.post('/collaborator', collaboratorsController.create);
routes.get('/collaborator', collaboratorsController.index);

// Score Value's APIs
routes.post('/score-value', scoreValueController.create);
routes.get('/score-value', scoreValueController.index);

// Prize's APIs
routes.post('/prize', prizeController.create);
routes.get('/prize', prizeController.index);

// Voucher's APIs
routes.post('/voucher', voucherController.create);
routes.get('/voucher', voucherController.index);

// Score's APIs
routes.post('/score', scoreController.create);
routes.get('/score', scoreController.index);

// Project's APIs
routes.post('/project', projectController.create);
routes.get('/project', projectController.index);
routes.post('/project/associate', projectController.associate);
routes.get('/project/associate', projectController.association);

// Login API
routes.post('/session', sessionController.create);

module.exports = routes;