// hooks.js
const { BeforeAll, Before, AfterAll, After } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(10000); // Increases the timeout to 10 seconds

let browser;
let page;

const { chromium } = require('playwright');

BeforeAll(async function () {
	browser = await chromium.launch({ headless: false });
});

Before(async function () {
	page = await browser.newPage();
	this.page = page; // 'this' refers to the World context in Cucumber
	this.logs = [];
	this.page.on('console', msg => this.logs.push(msg.text()));
});

After(async function (scenario) {
	if (scenario.result.status === 'FAILED') {
		const screenshot = await this.page.screenshot({ encoding: 'base64' });
		this.attach(screenshot, 'image/png');

		// Attach console logs if there are any
		if (this.logs.length > 0) {
			const logsString = this.logs.join('\n'); // Join all log entries with a newline
			this.attach(logsString, 'text/plain');
		}
	}

	await this.page.close();
});

AfterAll(async function () {
	await browser.close();
});

// Step Definitions (e.g., given.js)
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I am on automation store home page', async () => {
	await page.goto('https://automationteststore.com/');
});

// Assuming you have methods like selectProduct implemented correctly
When('I select product 1 and add to cart', async () => {
	try {
		await page.selectProduct('Absolue Eye Precious Cells');
		console.log('Product selection successful');
	} catch (error) {
		console.log('Error during product selection');
		throw error; // Re-throw the error to ensure the step fails
	}
});

When('I select product 2 and add to cart', async () => {
	await page.selectProduct('Womens high heel point toe stiletto sandals');
});

When('I select product 3 and add to cart', async () => {
	await page.selectProduct('Total Moisture Facial Cream');
});

Then('I should see 3 items on item cart', async () => {
	const element = await page.locator(
		'.topcart .dropdown-toggle > .label-orange'
	);
	await element.waitFor({ state: 'visible' });
	await expect(element).toHaveText('3');
});
