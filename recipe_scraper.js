"use strict";

var uz = Unitz.uz;
Unitz.Classes.addDefaults();
Unitz.Translations.addDefaults();

const options = {
	unit: Unitz.OutputUnit.SHORT, // Unit word format
	significant: 2, // decimal places
	system: Unitz.System.ANY,
	min: 0.2, // Min values to display
	max: 9999 // Max values to display
};

var url = new URL(window.location.href);
var recipe = JSON.parse(url.searchParams.get("r"));

var page = {};
page.appDiv = document.getElementById("app");
page.recipeDiv = document.getElementById("recipe");


if( recipe ) {
	page.recipeDiv.hidden = false;

	// Parse ingredients + measurements
	for (let i = 0; i < recipe.recipeIngredient.length; i++) {
		const ingredient = recipe.recipeIngredient[i].text || recipe.recipeIngredient[i]; // nytimes returns object with 'text' key
		recipe.recipeIngredient[i] = {};
		let curIngredient = recipe.recipeIngredient[i];

		// Match entire measurement string
		const measurements = ingredient.match(/^\d? ?\d+\/?\d?(.\d)? ?x? ?(tbsp|tbs|tsp|cup|g|ml|teaspoon|tablespoon|bunch|can|kg)?s?[^()a-z\d]/gi);
		if (measurements) {

			let measurementStr = measurements[0].trim(); // includes whole number, fraction (if any), decimal point (if any) and unit
			
			curIngredient.item = ingredient.substring(measurementStr.length);
			curIngredient.measurement = uz(measurementStr.replace('x', '').trim()); // Remove x if present

		} else {
			// No measurement
			curIngredient.item = ingredient;
		}

		// Capitalise first letter
		curIngredient.item = curIngredient.item.trim().charAt(0).toUpperCase() + curIngredient.item.trim().slice(1); 
	}

	page.name = document.getElementById("name");
	page.prepTimeHeading = document.getElementById("prepTimeHeading");
	page.prepTime = document.getElementById("prepTime");
	page.cookTimeHeading = document.getElementById("cookTimeHeading");
	page.cookTime = document.getElementById("cookTime");
	//page.totalTime = document.getElementById("totalTime");
	page.recipeYield = document.getElementById("recipeYield");
	page.recipeYieldHeading = document.getElementById("recipeYieldHeading");
	page.image = document.getElementById("image");
	page.recipeIngredient = document.getElementById("recipeIngredient");
	page.recipeInstructions = document.getElementById("recipeInstructions");

	page.name.innerText = recipe.name;
	if( recipe.prepTime ) {
		page.prepTimeHeading.hidden = false;
		page.prepTime.hidden = false;
		page.prepTime.innerText = recipe.prepTime.match(/\d+/g)[0] + ' mins';
	}
	if( recipe.cookTime) {
		page.cookTimeHeading.hidden = false;
		page.cookTime.hidden = false;
		page.cookTime.innerText = recipe.cookTime.match(/\d+/g)[0] + ' mins';
	}
	//page.totalTime.innerText = recipe.totalTime;
	if( recipe.recipeYield && recipe.recipeYield == "0") {
		page.recipeYieldHeading.hidden = false;
		page.recipeYield.innerText = recipe.recipeYield;
	}
	page.image.setAttribute('src', recipe.image.url || recipe.image);

	// Ingredients 
	recipe.recipeIngredient.forEach((ingredient, i) => {
		page.recipeIngredient.innerHTML += `<tr><td id="item-${i}" class="ingredient-unit"></td><td class="item-cell">${ingredient.item}</td></tr>`

		if(ingredient.measurement) {
			const conversions = ingredient.measurement.conversions(options);

			let measCell = document.getElementById('item-'+i);
			const measStr = ingredient.measurement.output({options});
			if(conversions.ranges.length) { 
				
				let html = `<select name="item-${i}" id="meas-${i}">\
								<option>\
									${measStr}\
								</option>`;
				
				const conversionsStr = conversions.output(options).split(', ');
				conversionsStr.forEach(m => {
					if(m != measStr) html += `<option>${m}</option>`;
				});
				
				html += `</select>`;
				measCell.innerHTML = html;
			} else {
				measCell.classList.add("no-conversion");
				measCell.innerText = measStr;
			}
		}
	});

	recipe.recipeInstructions.forEach(item => {
		page.recipeInstructions.innerHTML += `<li>${item.text || item}</li>`
	});
}
