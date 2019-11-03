var express = require('express');
var router = express.Router();
var querystring = require("querystring");

const db = require('../models/index');
const queries = require('../databaseQueries');

//escape with slash
const escWSlash = function(str) {

	str = str.replace('||', '/')
	return querystring.escape(str)
}

const unescWSlash = function(str) {

	str = str.replace('/', '||')
	return querystring.unescape(str)
}

/* GET home page. */
const catalogCreate =  function(req, res, next) {
	console.log("request url", req.url); 

	let url = req.url.split('/')
	
	for(let i in url){
		url[i] = unescWSlash(url[i])
	}


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
}

router.get('/*', catalogCreate);

const catalogRenderCategoryPage = function(req, res, url, categories, products) {
	req.render.cards = []

		
	categories.forEach(item => {
		item = item.dataValues
		//console.log(item);
		let path = `/catalog/`

		url.forEach(u => {
			if(u != '')
				path += u + '/' 
		})

		path += escWSlash(`${item.name}`)
		
		req.render.cards.push({title: item.name, subtitle: item.description, 
			path: path, image: item.image})	
	})


	products.forEach(item => {
		item = item.dataValues
		let path = `/catalog/`

		url.forEach(u => {
			if(u != '')
				path += u + '/' 
		}) 

		path +=  escWSlash(`p${item.name}`)

		let spec = JSON.parse(item.specification)
		//console.log(spec)

		req.render.cards.push({
			title: `${item.name.split('_')[0]} ${spec.Power.value} kW`,
			subtitle: `${spec.Output.value} V, ` +
			`${spec.Current.value} A`, 
			path: path, 
			image: item.image
		})	
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

	req.render.product.images = [product.image]
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
			name: unescWSlash(url[i])
		})		
		path += "/" + url[i]
	}

	if(breadcrumb[breadcrumb.length-1].name[0] == 'p'){
		let str = breadcrumb[breadcrumb.length-1].name 
		breadcrumb[breadcrumb.length-1].name = str.slice(1,str.length-1)
		
		//console.log()
	}

	return breadcrumb
}

module.exports = router;
