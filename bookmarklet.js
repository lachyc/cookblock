javascript: (function () {
	javascript: (function () {
		var sections = document.getElementsByTagName("SECTION");

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
			'i made it', // allrecipes
			'magazine',
			'close dialog',
			'subscribe',
			'$',
			'recommended',
			'people', //taste
			'recipes'
		];

		var b = '';

		for (let i = 0; i < sections.length; i++) {
			const e = sections[i].innerText;
			if (headings.some(v => e.toLowerCase().includes(v))) {
				if (!avoid.some(v => e.toLowerCase().includes(v))) {
					b += e.trim() + '\n'.replace(/\n{3,}/g, '\n');
					
				}
			}
		}
		console.log(b);


		window.open(`http://localhost:5501/?sections=${encodeURIComponent(JSON.stringify(b))}`);
	})()
})();