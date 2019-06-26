module.exports = {

	//finds categoies with null subcategoryFor attriebute
	findMainCategories: function(db, callback) {
		//return promise
		db.Category.findAll({
			where: {subcategoryFor: null}
		}).then(categories => callback(categories))
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
	}


}