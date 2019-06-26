var express = require('express');
var router = express.Router();

const db = require('../models/index');
const queries = require('../databaseQueries');

/* GET home page. */
router.get('/*', function(req, res, next) {
	let url = req.url.split('/')
	url.splice(0,1)

	console.log(req.url, url);

	//if /catalog page has been loaded
	if(url[url.length-1] == ''){
		//find main categories
		queries.findMainCategories(db, categories => {
			catalogRenderCategoryPage(req, res, url, categories)
		})
	}	
	else{
		//find subcategories
		queries.findCategoryIdForName(db, decodeURI(url[url.length-1]), cat => {
			queries.findSubcategoriesForId(db, cat.id, categories => {
				catalogRenderCategoryPage(req, res, url, categories)
			})
		})
	}
	 
	 /*= [
		{title: "Falowniki", subtitle: "3 fazowe", path: "#", image:"/images/inverter2.png"},
		{title: "Falowniki", subtitle: "1 fazowe", path: "#", image:"/images/inverter2.png"},
		{title: "Elektronika", subtitle: "", path: "#", image:"/images/inverter2.png"},
	]*/

});

const catalogRenderCategoryPage = function(req, res, url, categories) {
	req.render.cards = []
	
	categories.forEach(item => {

		let path = `catalog/`

		url.forEach(u => {
			if(u != '')
				path += u + '/' 
		})

		path += `${item.name}`

		req.render.cards.push({title: item.name, subtitle: item.name, 
			path: path, image:"/images/inverter2.png"})	
	})

	res.render('catalog', { render: req.render });
}

module.exports = router;
