class ecomPage {
	constructor(page) {
		(this.page = page),
			(this.searchBar = page.locator('#small-searchterms')),
			(this.searchButton = page.locator('.button-1.search-box-button'));
		//this.selectProduct = page.get
	}
}

module.exports = { ecomPage };

