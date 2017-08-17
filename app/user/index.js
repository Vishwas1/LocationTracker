var express = require('express'),
	router = express.Router(),
	controller = require('./controller');



router.post('/create',controller.create); //routes for creating a user

module.exports =router;
