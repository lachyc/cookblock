javascript: (function () {
	javascript: (function () {
		const sections = [ // Sections to pull from JSON
			'cookTime',
			'image',
			'name',
			'prepTime',
			'recipeIngredient',
			'recipeInstructions',
			'recipeYield',
			'totalTime',
		];

		// Pull JSON from <head>
		var scrapedJSON = {};
		var scrapedRecipe = {};
		const scripts = document.getElementsByTagName("script");
		for (let i = 0; i < scripts.length; i++) {
			const s = scripts[i];

			if (s.getAttribute('type') == "application/ld+json") {
				scrapedJSON = JSON.parse(s.innerText);

				//allrecipes returns an array
				if (!Array.isArray(scrapedJSON)) {
					scrapedJSON = [scrapedJSON]; // a bit cheeky
				}

				scrapedJSON = scrapedJSON.filter(item => {
					return item["@type"] == 'Recipe';
				});

				if (scrapedJSON.length) {
					scrapedRecipe = scrapedJSON[0];
					break;
				}
			}

		}

		// Select items from JSON
		var recipe = {};
		for (let i = 0; i < Object.keys(scrapedRecipe).length; i++) {
			const key = Object.keys(scrapedRecipe)[i];
			if (sections.some(v => key === (v))) {
				recipe[key] = scrapedRecipe[key];
			}
		}

		window.open(`http://young-clone.bnr.la/?r=${encodeURIComponent(JSON.stringify(recipe))}`);
	})();
})()