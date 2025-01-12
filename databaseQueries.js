
const Sequelize = require('sequelize');

// Pass in your sequelize JSON object
const convert = function(json){ 
    var returnedJson = []; // This will be the object we return
    //json = JSON.parse(json);

    if(json instanceof Array){
    	return json	
    } 

    // Extract the JSON we need 
    if(json.hasOwnProperty('dataValues')){
        //console.log("HI: " + json[0].dataValues);
        returnedJson = json[0].dataValues; // This must be an INSERT...so dig deeper into the JSON object
    } else {
        //console.log(json[0]);
        returnedJson = json; // This is a find...so the JSON exists here
    }

    //console.log("r: ", returnedJson);
    return returnedJson; // Finally return the json object so it can be used
}


let queries = {

	//finds categoies with null subcategoryFor attriebute
	findMainCategories: function(db, callback) {
		//return promise
		db.Category.findAll({
			where: {subcategoryFor: null}
		}).then(categories => callback(categories))
	},

	findAllProducts: function(db, callback) {
		
		//return promise
		db.Product.findAll({
			where: {visible: true}
		}).then(products => {
			callback(products)
		}).catch(e => console.error(e))
	},

	findAllProductsMin: function(db, callback) {
		
		//return promise
		db.Product.findAll({
			where: {
				visible: true
			},
			attributes: ['id', 'name', 'specification', 'price', 'longName', 'category']
		}).then(products => {
			console.log("find all");
			callback(products)
		}).catch(e => console.error(e))
	},

	findAllCategories: function(db, callback) {
		db.Category.findAll({}).
	    then(cat => {
	        callback(cat)
	    })
	},

	findAllUpperCategoriesForProducts: function(db, products, callback) {
		queries.findAllCategories(db, (categories) => {
			for(let i in products) {
				let upper = products[i].category
				let cats = []

				while(upper != null){
					for(let j  in categories){
						if(categories[j].id == upper){
							cats.push(categories[j].name)
							upper = categories[j].subcategoryFor
							break
						}
					}
				}

				products[i].category = cats
			}			

			callback(products)
		})
	},

	//find upper/over category for specified id
	findUpperCategoryForId: function(db, id, callback) {
		db.Category.findOne({
        	where: {id: id},
	    }).
	    then(cat => {
	        cat.getCategory().then(upperCat => callback(upperCat))
	    })
	},

	//find subcategories for specified id
	findSubcategoriesForId: function(db, id, callback) {
		db.Category.findOne({
        	where: {"id": id},
	    }).
	    then(cat => {
		
	        cat.getCategories({
	        	where: {visible: 1},
	        	attributes: ['name','description']
	        })
	        .then(subcategories => callback(subcategories))
	    })
	},

	//find id for known category name
	findCategoryIdForName(db, name, callback) {
		db.Category.findOne({
			where: {"name": name}
		}).then(id => callback(id))
	},

	findProductsOfCategoryId(db, id, callback) {
		db.Category.findOne({
        	where: {"id": id},
	    }).
	    then(cat => {
		
	        cat.getProducts({
	        	where: {visible: 1},
	        })
	        .then(products => callback(products))
	    })
	},

	findProductForName(db, name, callback) {
		
		db.Product.findOne({
			where: {
				"name":  name
			}
		}).
		then(product => {
			callback(product)
		})
	}
}

module.exports = queries