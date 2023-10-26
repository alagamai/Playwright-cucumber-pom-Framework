// hooks.js
const { BeforeAll, Before, AfterAll, After } = require('@cucumber/cucumber');

let browser;
let page;

const { chromium } = require('playwright');

BeforeAll(async function () {
	browser = await chromium.launch({ headless: false });
});

Before(async function () {
	this.page = await browser.newPage();
});

After(async function (scenario) {
	if (scenario.result.status === 'FAILED') {
		if (this.page) {
			const screenshot = await this.page.screenshot({ encoding: 'base64' });
			this.attach(screenshot, 'image/png');
		}
	}
	if (this.page) {
		await this.page.close();
	}
});

AfterAll(async function () {
	await browser.close();
});

// Step Definitions (e.g., given.js)
const { Given, When, Then } = require('@cucumber/cucumber');
const ecomPage = require('../pageObj/ecomPage'); // Make sure to import your page object module

Given('I am on e-commerce portal', async function () {
	await this.page.goto('https://demo.nopcommerce.com');
	console.log('Page is opened');
});

When('I search for the item "Lenovo"', async function () {
	await ecomPage.searchbar(this.page).type('Lenovo');
	await ecomPage.searchButton(this.page).click();
});

When(
	'I click on item "Lenovo IdeaCentre 600 All-in-One PC"',
	async function () {
		// Assuming there's a method in ecomPage to get the product link, replace the selector accordingly.
		await this.page.click('text=Lenovo IdeaCentre 600 All-in-One PC');
	}
);

Then('I should be taken to item detail page', async function () {
	// Replace the URL check with the expected URL. Use Playwright's `page.url()` method.
	expect(await this.page.url()).toContain(
		'https://demo.nopcommerce.com/lenovo-ideacentre-600-all-in-one-pc'
	);
});
