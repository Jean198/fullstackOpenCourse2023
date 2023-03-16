const testRouter = require('express').Router();
const testController = require('../controllers/testing');

testRouter.post('/reset', testController.testing);

module.exports = testRouter;
