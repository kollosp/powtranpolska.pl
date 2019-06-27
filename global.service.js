global.directory = {
	"Type": ["Type", "Typ"],
	"Power": ["Power", "Moc"],
	"Current": ["Current", "Prąd"],
	"Input": ["Input", "Wejście"],
	"Output": ["Output", "Wyście"],
	"Weight": ["Weight", "Waga"],
	"Dimensions": ["Dimensions", "Wymiary"],
	"Catalog": ["Catalog", "Katalog"]
}

global.languages = {
	"en": 0,
	"pl": 1
}



global.translator = {
	translate: function(inputText, language) {
		let lan = languages[language]


		if(directory.hasOwnProperty(inputText)){
			return directory[inputText][lan]
		}
		else{
			return inputText
		}

	}
}