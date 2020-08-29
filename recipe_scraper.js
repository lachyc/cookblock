"use strict";

var url = new URL(window.location.href);
var recipe = JSON.parse(url.searchParams.get("r"));

var page = {};
page.appDiv = document.getElementById("app");
page.recipeDiv = document.getElementById("recipe");

if( !recipe ) {
	page.recipeDiv.setAttribute('hidden', 1);
} else {


	page.name = document.getElementById("name");
	page.prepTime = document.getElementById("prepTime");
	page.cookTime = document.getElementById("cookTime");
	//page.totalTime = document.getElementById("totalTime");
	page.recipeYield = document.getElementById("recipeYield");
	page.recipeYieldHeading = document.getElementById("recipeYieldHeading");
	page.image = document.getElementById("image");
	page.recipeIngredient = document.getElementById("recipeIngredient");
	page.recipeInstructions = document.getElementById("recipeInstructions");

	page.name.innerText = recipe.name;
	page.prepTime.innerText = recipe.prepTime.match(/\d+/g)[0] + ' mins';
	page.cookTime.innerText = recipe.cookTime.match(/\d+/g)[0] + ' mins';
	//page.totalTime.innerText = recipe.totalTime;
	if( recipe.recipeYield == "0") {
		page.recipeYieldHeading.setAttribute('hidden', 1);
	} else {
		page.recipeYield.innerText = recipe.recipeYield;
	}
	page.image.setAttribute('src', recipe.image.url);

	recipe.recipeIngredient.forEach(item => {
		page.recipeIngredient.innerHTML += `<li>${item}</li>`
	});

	recipe.recipeInstructions.forEach(item => {
		page.recipeInstructions.innerHTML += `<li>${item}</li>`
	});

}