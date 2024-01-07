const { BeforeAll, Before, AfterAll, After } = require('@cucumber/cucumber');
const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { Ecom1Page } = require('../pageObj/ecom1-pom');
const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30000); // Increases the timeout to 10 seconds

let browser;
let page;
let ecomPage;

BeforeAll(async function () {
	browser = await chromium.launch({ headless: false });
});

Before(async function () {
	page = await browser.newPage();
	this.page = page; // 'this' refers to the World context in Cucumber
	this.logs = [];
	this.page.on('console', msg => this.logs.push(msg.text()));

	// Create an instance of Ecom1Page and pass the Playwright page instance
	ecomPage = new Ecom1Page(page);
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

Given('I am on account page for Tools QA', async () => {
	await ecomPage.page.goto('https://shop.demoqa.com/', {
		timeout: 30000,
	}); // 30 seconds timeout
});

When(
	'I do the search for shirts with below specifications',
	async dataTable => {
		const data = dataTable.hashes();
		const actualLength = data.length;
		console.log(`actual data table len : ${actualLength}`);
		for (let row = 1; row <= actualLength; row++) {
			// await page.getByLabel('Size').selectOption('34');
			// await page.getByRole('button', { name: 'Add to cart' }).click();
			// await page
			// 	.getByText(
			// 		'View cart “blue denim super oversized boyfriend shirt” has been added to your ca'
			// 	)
			// 	.click();
			// await page
			// 	.getByText(
			// 		'View cart “blue denim super oversized boyfriend shirt” has been added to your ca'
			// 	)
			// 	.click();

			await ecomPage.clickOnSearch({ force: true });
			console.log('table value 1 *** ' + dataTable.rawTable[row][0]);
			await ecomPage.searchForSpec(`${dataTable.rawTable[row][0]}`);
			await ecomPage.searchBoxEnter();
			await ecomPage.selectColor(dataTable.rawTable[row][2]);
			await ecomPage.selectSize(dataTable.rawTable[row][1]);
			console.log('quantities ***** : ' + dataTable.rawTable[row][3]);
			for (let index = 0; index < dataTable.rawTable[row][3]; index++) {
				await ecomPage.clickOnAddQty();
			}

			// Wait for 2 seconds
			await page.waitForTimeout(4000);

			const addToCartButton = await ecomPage.elements.addToCart();
			await addToCartButton.click();
		}
	}
);
