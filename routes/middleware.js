var express = require('express');
var router = express.Router();


router.use('/', function(req, res, next) {

	req.render = {

	}

	next()
});

module.exports = router;
