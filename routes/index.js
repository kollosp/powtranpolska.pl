var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { render: req.render });
});

/* GET download. */
router.get('/download', function(req, res, next) {

	req.render.download = [{date: "25.04.19", name: "Instrukcja obsługi PI8000", path: "/jakas/sciezka/do/pliku"},
		{date: "25.04.19", name: "Instrukcja obsługo PI8000", path: "/jakas/sciezka/do/pliku"},
		{date: "25.04.19", name: "Instrukcja obsługo PI8000", path: "/jakas/sciezka/do/pliku"}]

	res.render('download', { render: req.render });
});

/* GET prices. */
router.get('/prices', function(req, res, next) {
	res.render('prices', { render: req.render });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
	res.render('contact', { render: req.render });
});

/* GET products (menu) page. */
router.get('/products', function(req, res, next) {
	res.render('products', { render: req.render });
});


module.exports = router;
