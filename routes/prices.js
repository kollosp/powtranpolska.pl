var express = require('express');
var router = express.Router();

var querystring = require("querystring");

const db = require('../models/index');
const queries = require('../databaseQueries');

/* GET users listing. */
router.get('/', function(req, res) {
	/* GET prices. */
	req.render.products = []

	queries.findAllProductsMin(db, (products) => {
		console.log("price");
		console.log(products)

		queries.findAllUpperCategoriesForProducts(db, products, () => {
			
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

				item.specification = JSON.parse(item.specification)
				let path = "/catalog/"

				for(let i=item.category.length-1; i>=0; --i){
					if(item.category[i] != '')
						path += querystring.escape(item.category[i]) + '/' 
				} 

				
				path +=  querystring.escape(`p${item.name}`)
				
				req.render.products.push({
					name: item.name,
					price: item.price,
					specification: spec,
					link: path,
					category: item.category[item.category.length-1]
				})
			})
		
			res.render('prices', { render: req.render });
		})
		
	})

	
});

module.exports = router;
