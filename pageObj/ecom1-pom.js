class Ecom1Page {
	constructor(page) {
		this.page = page;
	}

	elements = {
		userNameInput: () => this.page.locator('#reg_username'),
		emailInput: () => this.page.locator('#reg_email'),
		passwordInput: () => this.page.locator('#reg_password'),
		registerButton: () => this.page.locator('[name="register"]'),
		loginUserName: () => this.page.locator('#username'),
		loginPassword: () => this.page.locator('#password'),
		loginButton: () => this.page.locator('[name="login"]'),
		accountName: () =>
			this.page.locator(
				'.woocommerce-MyAccount-content > :nth-child(2) > :nth-child(1)'
			),
		searchIcon: () => this.page.getByRole('link', { name: 'U Search' }),
		colorDropDown: () => this.page.getByLabel('Color'),
		searchBox: () => this.page.getByRole('searchbox'),
		sizeDropDown: () => this.page.getByLabel('Size'),
		addQty: () => this.page.getByRole('button', { name: 'L' }),
		addToCart: () => this.page.getByRole('button', { name: 'ADD TO CART' }),

		cartIcon: () => this.page.locator('.cart-name-and-total'),
		cartNameTotal: () => this.page.locator('.cart-name-and-total'),
		checkout: () =>
			this.page.locator('.wc-proceed-to-checkout > .checkout-button'),
		billingFirstName: () => this.page.locator('#billing_first_name'),
		billingLastName: () => this.page.locator('#billing_last_name'),
		streetAddr: () => this.page.locator('#billing_address_1'),
		city: () => this.page.locator('#billing_city'),
		postalCode: () => this.page.locator('#billing_postcode'),
		phone: () => this.page.locator('#billing_phone'),
		placeOrder: () => this.page.locator('#place_order'),
		terms: () => this.page.locator('#terms'),
		thankYouMsg: () =>
			this.page.locator('.woocommerce-thankyou-order-received'),
		logout: () =>
			this.page.locator('.woocommerce-MyAccount-content > :nth-child(2) > a'),
	};

	typeUserName = async uName => await this.elements.userNameInput().type(uName);
	typeEmail = async email => await this.elements.emailInput().type(email);
	typePwd = async pwd => await this.elements.passwordInput().type(pwd);
	clickRegisterButton = async () =>
		await this.elements.registerButton().click({ force: true });
	clickOnSearch = async () => await this.elements.searchIcon().click();
	selectColor = async color =>
		await this.elements.colorDropDown().selectOption(color);
	searchForSpec = async spec => await this.elements.searchBox().fill(spec);
	searchBoxEnter = async () => await this.elements.searchBox().press('Enter');
	selectSize = async size =>
		await this.elements.sizeDropDown().selectOption(size);
	clickOnAddQty = async () => await this.elements.addQty().click();
}

module.exports = { Ecom1Page };
