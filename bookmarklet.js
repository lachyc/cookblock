javascript: (function () {
	javascript: (function () {
		var recipe = {};
		const sections = document.getElementsByTagName("SECTION");
		
		// Get title from meta tags
		const metas = document.getElementsByTagName('meta');
		for (let i = 0; i < metas.length; i++) {
			console.log(metas[i].getAttribute('property'));
			if( metas[i].getAttribute('property') == "og:title" ) {
				recipe.title = metas[i].getAttribute('content');
			}
		}
		if( !recipe.title ) {
			console.log('Could not find title.');
		} else {
			const imgs = document.getElementsByTagName('img');
			for (let i = 0; i < imgs.length; i++) {
				const tag = imgs[i];
				console.log(tag);
				if( tag.getAttribute('alt') && tag.getAttribute('alt').includes( recipe.title) ) {
					recipe.img = 'http:' + tag.getAttribute( 'data-imagesrc' ); // img loaded as data-imagesrc="//aucdn.ar-cdn.com/ here - view-source:http://allrecipes.com.au/recipe/12464/lemon-coconut-slice.aspx
					console.log(recipe.img);
				}
			}
		}
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

		recipe.body = '';
		for (let i = 0; i < sections.length; i++) {
			const e = sections[i].innerText;
			if (headings.some(v => e.toLowerCase().includes(v))) {
				if (!avoid.some(v => e.toLowerCase().includes(v))) {
					recipe.body += e.trim() + '\n'.replace(/\n{3,}/g, '\n');
				}
			}
		}
		console.log(recipe);


		window.open(`http://localhost:5501/?r=${encodeURIComponent(JSON.stringify(recipe))}`);
	})()
})();