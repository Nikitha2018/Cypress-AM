Cypress tests for Audit Manager +
This repository contains Cypress tests for the Compliance Manager App.

Adding Tests
Please remember to keep this repository up to date as the tests become worthless otherwise. A good rule of thumb is to add a new test that covers whatever bug you're fixing so we can track regressions on it. Also, make sure to code your tests in a cross-operating system compliant manner as it's valid to run them in Windows, Mac or Linux environments.

Install Cypress
Clone the repo.
Navigate to cypress-cm.
Run command
    npm install
Running Tests
Navigate to cypress-cm.

Run command

Headed mode.

    npx cypress open
Headless mode.

    npx cypress run
Give URL from the command line
npx cypress run --env environment=value

The default environment is QA

If we want to run it on UAT, we can send it through the command line or change the environment value in the cypress.config.js file. The command line value will override the config file value.

Command line examples
Run a specific spec file
npx cypress run --spec cypress/integration/regressioncases/Authentication.js
Run the test in head mode
npm run testHeaded
This will run the test in head mode and will generate a report as well. This can be changed from the package.json file

Run the test in headless mode
npm run test
This will run in headless mode and will generate report

npm install --save mailslurp-client

Do's before raising PR:
1. Do npx cypress run before every commit to avoid catching errors in circle ci
2. Do npm ls - for checking dependency discrepancy.
3. Do npm update - for fixing dependency discrepancy.
