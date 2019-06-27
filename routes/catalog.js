var express = require('express');
var router = express.Router();

const db = require('../models/index');
const queries = require('../databaseQueries');

/* GET home page. */
router.get('/*', function(req, res, next) {
	let url = req.url.split('/')
	url.splice(0,1)

	console.log(req.url, url, url[url.length-1][0]);

	//if /catalog page has been loaded
	if(url[url.length-1] == ''){
		//find main categories
		queries.findMainCategories(db, categories => {
			catalogRenderCategoryPage(req, res, url, categories, [])
		})
	}
	//generate product page
	else if(url[url.length-1][0] == 'p'){
		
		let name = url[url.length-1]
		name = name.substring(1, name.length)

		queries.findProductForName(db, name, product => {
			renderProductPage(req, res, url, product)
		})
	}
	else{		
		//find subcategories
		queries.findCategoryIdForName(db, decodeURI(url[url.length-1]), cat => {
			queries.findSubcategoriesForId(db, cat.id, categories => {
				queries.findProductsOfCategoryId(db, cat.id, products => {
					catalogRenderCategoryPage(req, res, url, categories, products)
				})
			})
		})
	}
});

const catalogRenderCategoryPage = function(req, res, url, categories, products) {
	req.render.cards = []

		
	categories.forEach(item => {
		item = item.dataValues
		console.log(item);
		let path = `/catalog/`

		url.forEach(u => {
			if(u != '')
				path += u + '/' 
		})

		path += `${item.name}`

		req.render.cards.push({title: item.name, subtitle: item.name, 
			path: path, image:"/images/inverter2.png"})	
	})


	products.forEach(item => {
		item = item.dataValues
		console.log(item);
		let path = `/catalog/`

		url.forEach(u => {
			if(u != '')
				path += u + '/' 
		})

		path += `p${item.name}`

		req.render.cards.push({title: item.name, subtitle: item.name, 
			path: path, image:"/images/inverter2.png"})	
	})


	req.render.breadcrumb = crateUrlForBreadCrumb(req.url)
	res.render('catalog', { render: req.render });
}

const renderProductPage = function(req, res, url, product){
	
	product = product.dataValues
	req.render.product = product
	
	try{
		let s = JSON.parse(req.render.product.specification)
		req.render.product.specification = {}

		for(let key in s){
			req.render.product.specification[translator.translate(key, 'pl')] = s[key]			
		}

	}catch(e){
		req.render.product.specification = {}
		console.log(e);
	}

	req.render.breadcrumb = crateUrlForBreadCrumb(req.url)

	req.render.product.images = ["/images/inverter2.png"]
	res.render('product', { render: req.render });
}

const crateUrlForBreadCrumb = function(url) {
	url = url.split('/')
	url.splice(0,1)

	let path = "/catalog"
	
	let breadcrumb = [{
		name: translator.translate('Catalog', 'pl'),
		path: path
	}]

	for(let i in url){
			
		breadcrumb.push({
			path: path + "/" + url[i],
			name: decodeURI(url[i])
		})		
		path += "/" + url[i]
	}

	return breadcrumb
}

module.exports = router;
