"use strict";

var url = new URL(window.location.href);
var recipe = JSON.parse(url.searchParams.get("r"));

var page = {};
page.appDiv = document.getElementById("app");
page.recipeDiv = document.getElementById("recipe");

if( recipe ) {
	page.recipeDiv.hidden = false;

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

	recipe.recipeIngredient.forEach(item => {
		page.recipeIngredient.innerHTML += `<li>${item.text || item}</li>`
	});

	recipe.recipeInstructions.forEach(item => {
		page.recipeInstructions.innerHTML += `<li>${item.text || item}</li>`
	});

}