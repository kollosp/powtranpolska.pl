var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { render: req.render });
});

/* GET download. */
router.get('/download', function(req, res, next) {

	let dirpath = __dirname + "/../public/downloads"
	
	req.render.download = []
	fs.readdir(dirpath, (err, files) => {
		if(err){
			console.error(err)
			return 
		}

		files.forEach(file => {
			let stats = fs.statSync(dirpath + "/" +file)
			console.log(stats);

			req.render.download.push({
				date: stats.mtime.toLocaleDateString("nl",{year:"2-digit",month:"2-digit", day:"2-digit"}),
				name: file,
				path: "/downloads/" + file
			})
		})
		
		res.render('download', { render: req.render });
	})

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
