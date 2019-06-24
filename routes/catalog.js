var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.render.cards = [
		{title: "Falowniki", subtitle: "3 fazowe", path: "#", image:"/images/inverter2.png"},
		{title: "Falowniki", subtitle: "1 fazowe", path: "#", image:"/images/inverter2.png"},
		{title: "Elektronika", subtitle: "", path: "#", image:"/images/inverter2.png"},
	]

	res.render('catalog', { render: req.render });
});

module.exports = router;
