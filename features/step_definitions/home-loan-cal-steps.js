const { Given, When, Then } = require('cucumber');
const fnTimeout = 90000;

Given('I open {string} page' , {timeout: fnTimeout}, async function (string) {
  return await this.openBrowser();
});

// ----------
//  W H E N
// ----------
When('I enter Your details column as following:', {timeout: fnTimeout},  async function (dataTable) {
  // fill 'Your details' section
  return await this.enterYourDetails(dataTable);
});

When('I enter Your earnings column as following:', {timeout: fnTimeout}, async function (dataTable) {
  // fill 'Your earning' section
  return await this.enterYourEarnings(dataTable);
});

When('I enter Your expenses column as following:', {timeout: fnTimeout}, async function (dataTable) {
  // fill 'Your expenses' section
  return await this.enterYourExpenses(dataTable);
});

When('I click on {string} button', {timeout: fnTimeout}, async function (string) {
  // click a button { 'Work out how much...' or 'Start over' }
  return await this.clickOnButton(string);
});

// ----------
//  T H E N
// ----------
Then('I see my borrowing estimate of {string}', {timeout: fnTimeout}, async function (string) {
  // Verify 'borrowing estimate $xxx,xxx' 
  return await this.verifyEstimate(string);
});

Then('I see a message of {string} as {string}', {timeout: fnTimeout}, async function (string, string2) {
  //  verify 'warning message' at the bottom 
  if (string=="estimation") return await this.verifyWarningMessage(string2);
  else return '';
});

Then('I see Your earnings column as following:', {timeout: fnTimeout}, async function (dataTable) {
  // verify values in 'Your earning' fields
  return await this.verifyYourEarnings(dataTable);
});

Then('I see Your expenses column as following:',{ timeout: fnTimeout}, async function (dataTable) {
  // verify values in 'Your expenses' fields
  return await this.verifyYourExpenses(dataTable);
});