"use strict";

var url = new URL(window.location.href);
var b = url.searchParams.get("r");

var body = document.getElementById("recipe");

var steps = /step \d/gi; 
var headings = [
	'ingredient',
	'ingredients',
	'method',
	'recipe',
	'directions', //allrecipes
	'instructions',
	'prep' //allrecipes
];

var avoid = [
	'2010',
	'2011',
	'2012',
	'2013',
	'2014',
	'2015',
	'2016',
	'2017',
	'2018',
	'2019',
	'2020',
	'2021',
	'2022',
	'2023',
	'2024',
	'comment',
	'i made it print', // allrecipes
	'magazine',
	'close dialog',
	'subscribe',
	'$',
	'recommended',
	'people', //taste
	'recipes'
]

b = b.split(/\\n/g);
// Remove empty lines
b = b.filter(element => {
	return element.match(/\w/g);
});

// Remove non-recipe related lines
var i = 0;
var content = {};
var key = 'empty';
body.innerHTML = '';
b = b.reduce(function(total, cur, currentIndex, arr){
	if(cur.endsWith('<br /><br />')) return total;

	if (headings.some(v => cur.toLowerCase().startsWith(v))) {
		key = cur;
		content[key] = {};
		content[key].text = cur;
		content[key].items = [];
		i = 0;

	} else {
		content[key].items.push(cur);
		i ++;
	}

	return total+cur;
}, "")

for (let i = 0; i < Object.keys(content).length; i++) {
	const key = Object.keys(content)[i];

	let section = content[key];
	section.text = `<h2>${section.text}</h2>` // Headings
	body.innerHTML += section.text;

	for (let j = 0; j < section.items.length; j++) {
		let item = section.items[j];
		
		if(item.match(steps)) {
			item = `<strong>${item}</strong>`;
		} else {
			item = `<li>${item}</li>`
		}
		body.innerHTML += item;
	}
	
}

console.log(content);
