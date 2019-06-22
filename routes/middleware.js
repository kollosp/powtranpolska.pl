var express = require('express');
var router = express.Router();


router.use('/', function(req, res, next) {

	req.render = {
		news: [{title: "Seria PI8XXXX", date: "31.02.17", mainImage: "/images/inverter1.png", brief: "W naszej ofercie pojawily się kolejne moce falowników trójfazowych serii 8XXX zapoznaj się z ofertą"},
			   {title: "Seria PI9XXXX", date: "25.08.18", mainImage: "/images/inverter2.png", brief: "Najnowsza seria falowników PI9XXXX"}],
	    mainBanner: "/images/banner.png" 
	}

	next()
});

module.exports = router;
