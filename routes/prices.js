var express = require('express');
var router = express.Router();


const db = require('../models/index');
const queries = require('../databaseQueries');

/* GET users listing. */
router.get('/', function(req, res) {
	/* GET prices. */
	req.render.products = []

	queries.findAllProducts(db, (products) => {
		console.log("price");

		products.forEach(item => {
			item = item.dataValues

			let spec = ""

			try{
				let json = JSON.parse(item.specification)
				
				for(let k in json){
					spec += json[k].value + " " + json[k].unit + ", "
				}

				spec = spec.substring(0,spec.length-2)
			}
			catch(e){
				spec = item.specification
				console.error(e);
			}

			req.render.products.push({
				name: item.name,
				price: item.price,
				specification: spec,
				category: ""
			})
		})
		
		res.render('prices', { render: req.render });
	})

	
});

module.exports = router;
