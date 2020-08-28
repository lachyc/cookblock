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
			'2000',
			'2001',
			'2002',
			'2003',
			'2004',
			'2005',
			'2006',
			'2007',
			'2008',
			'2009',
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


		window.open(`http://http://young-clone.bnr.la/?r=${encodeURIComponent(JSON.stringify(b))}`);
	})()
})();