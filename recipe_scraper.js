"use strict";

var url = new URL(window.location.href);
var recipe = JSON.parse(url.searchParams.get("r"));

var page = {};
page.appDiv = document.getElementById("app");
page.recipeDiv = document.getElementById("recipe");

if( recipe ) {
	page.recipeDiv.hidden = false;

	for (let i = 0; i < recipe.recipeIngredient.length; i++) {
		const ingredient = recipe.recipeIngredient[i].text || recipe.recipeIngredient[i]; // nytimes returns object with 'text' key

		recipe.recipeIngredient[i] = {};
		recipe.recipeIngredient[i].measurement = {};
		let curIngredient = recipe.recipeIngredient[i];
		let curMeasurement = curIngredient.measurement;

		// Match entire measurement string
		const measurements = ingredient.match(/^\d? ?\d+\/?\d?(.\d)? ?(tbsp|tsp|cup|g|ml|teaspoon|tablespoon|bunch|can|kg)?s?[^()a-z]/gi);
		if (measurements) {

			const measurementStr = measurements[0].trim(); // includes whole number, fraction (if any), decimal point (if any) and unit
			const fraction = measurementStr.match(/\d ?\/ ?\d/gi); // match _only_ fraction e.g not whole number
			let decimalPoint = measurementStr.match(/\d ?\. ?\d/gi); // match _only_ if decimal point

			if (fraction) {
				const wholeNumberStr = measurementStr.match(/^\d[^\/]/gi); // match only whole value before fraction e.g 1 1/2
				let wholeNumber = 0;
				if (wholeNumberStr) {
					wholeNumber = parseInt(wholeNumberStr[0][0]); // get only first char
				}
				const fractionArray = fraction[0].split('/');
				const numerator = parseInt(fractionArray[0].trim());
				const denominator = parseInt(fractionArray[1].trim());

				curMeasurement.wholeNumber = wholeNumber;
				curMeasurement.fraction = fraction[0];
				curMeasurement.decimal = numerator / denominator;
				curMeasurement.value = measurementStr.match(/^\d? ?\d+\/?\d? ?/gi)[0]; // match only whole number and fraction
				curMeasurement.unit = measurementStr.substring(curMeasurement.value.length).trim();

			} else if (decimalPoint) {
				decimalPoint = decimalPoint[0];
				let wholeNumber = parseInt(decimalPoint[0]); // first char
				let decimal = parseInt(decimalPoint.substring(2).trim());

				curMeasurement.wholeNumber = wholeNumber;
				curMeasurement.decimal = decimal;
				curMeasurement.value = decimalPoint; // match only whole number and fraction
				curMeasurement.unit = measurementStr.substring(curMeasurement.value.length).trim();
			}else {
				const decimalStr = measurementStr.match(/^\d+/gi)[0]; // match number
				curMeasurement.decimal = parseInt(decimalStr);
				curMeasurement.value = curMeasurement.decimal;
				curMeasurement.unit = measurementStr.substring(decimalStr.length)
			}

			if (curMeasurement.unit.match(/teas\w+/gi)) { // broad 'teaspoon' wordings
				curMeasurement.unit = 'tsp';
			} else if (curMeasurement.unit.match(/tabl\w+/gi)) { // broad 'tablespoon' wordings
				curMeasurement.unit = 'tbsp';
			}
			curIngredient.item = ingredient.substring(measurementStr.length);

		} else {
			// No measurement
			curIngredient.item = ingredient;
		}

		curIngredient.item = curIngredient.item.trim().charAt(0).toUpperCase() + curIngredient.item.trim().slice(1); // Capitalise first letter
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

	recipe.recipeIngredient.forEach(ingredient => {
		page.recipeIngredient.innerHTML += `<tr><td class="ingredient-unit">${ingredient.measurement.value || ""} ${ingredient.measurement.unit || ""}</td><td class="item-cell">${ingredient.item.text || ingredient.item}</td></tr>`
	});

	recipe.recipeInstructions.forEach(item => {
		page.recipeInstructions.innerHTML += `<li>${item.text || item}</li>`
	});

}