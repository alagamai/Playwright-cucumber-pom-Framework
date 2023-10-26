# Test automation using Playwright + Cucumber s 

# Prerequisites

The first thing we need to do is to setup our environment. So here are some things that you should have to start this project:

VSCode: https://code.visualstudio.com/download </br>
NPM: https://www.npmjs.com/get-npm </br>
NodeJS: https://nodejs.org/en/download

# to install playwright and cucumber dependencies 
1.  sudo npm init playwright
2.  sudo npm install @cucumber/cucumber
3.  sudo npm install cucumber-html-reporter  
4.  create a file named reporter.js in root dir 
// reporter.js
const reporter = require('cucumber-html-reporter');
const options = {
    theme: 'bootstrap',
    jsonFile: 'report/cucumber_report.json',
    output: 'report/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true
};

reporter.generate(options);
 

# to run playwright scripts 
    add below line in package.json 
    "cy:cucumber": "npx cucumber-js --format json:report/cucumber_report.json && node reporter.js"

# Steps to execute the test

1. Checkout the project from git
2. Navigate to the project root directory
3. To install all the project dependencies execute 
    npm install
4. To run the test execute

    sudo npm run cy:cucumber
    npm run cy:run-all-tags - to run scenarios of all tags: regression or smoke
    
    npm run cy:run-regression-tag - to run scenarios of tag: regression  
    
 # Application under test 
 https://shop.demoqa.com/
 
 # Screenshots
[![Cucumber report](https://github.com/alagamai/cypress-bdd-cucumber-pom-framework/blob/main/cypress/link-to-readme/Cloud-Dashboard-Report.png)]
