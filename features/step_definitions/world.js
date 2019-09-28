const { setWorldConstructor } = require('cucumber');

//const HomeLoanPage = require('../../pageObjects/homeloanPage');
const puppeteer = require('puppeteer');
const assert = require('assert');

const HOMELOANCAL_URL = "https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/";

var xpath = '';
var actualTxt = '';

// TODO: implement 'Page Object Model'

class HomeLoanCalWorld {
  // Open browser
  async openBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 20,
      args: ['--start-maximized', '--window-size=1040,1640'] 
    });

    this.page = await this.browser.newPage();
    await this.page.goto(HOMELOANCAL_URL, {waitUntil: 'networkidle2'});
  }

  // Enter 'Your Details' column (3 rows)
  async enterYourDetails(dataTable) {
    try {
      // a. Application type
      if(dataTable.rows()[0][0] == "Single" ) xpath = '[for="application_type_single"]';
      else if (dataTable.rows()[0][0] == "Joint" ) xpath = '[for="application_type_joint"]';     
      
      await this.page.waitForSelector(xpath);
      await this.page.click(xpath);

      // b. Number of dependants
      await this.page.type('[title="Number of dependants"]', dataTable.rows()[0][1]);
      
      // c. Property you would like to buy  
      if(dataTable.rows()[0][2] == "Home to live in" ) xpath = '[for="borrow_type_home"]';     
      else if(dataTable.rows()[0][2] == "Residential investment" ) xpath = '[for="borrow_type_investment"]';   
      await this.page.click(xpath);         
    } catch (err) {
      console.error(err);
    }
  }

  // Enter 'Your Earnings' column (2 rows)
  async enterYourEarnings(dataTable) {
    try {
      // d. Your income (before tax)
      await this.page.type('[aria-labelledby="q2q1"]', dataTable.rows()[0][0]);
      // e. Your other income
      await this.page.type('[aria-labelledby="q2q2"]', dataTable.rows()[0][1]);
    } catch (err) {
      console.error(err);
    }
  }
  
  // Enter 'Your Expenses' column (5 rows)
  async enterYourExpenses(dataTable) {
    try {
      // f. Living expenses
      await this.page.type('[aria-labelledby="q3q1"]', dataTable.rows()[0][0]);
      // g. Current home loan repayments
      await this.page.type('[aria-labelledby="q3q2"]', dataTable.rows()[0][1]);
      // h. Other loan repayments
      await this.page.type('[aria-labelledby="q3q3"]', dataTable.rows()[0][2]);
      // i. Other commitments
      await this.page.type('[aria-labelledby="q3q4"]', dataTable.rows()[0][3]);
      // j. Total credit card limits
      await this.page.type('[aria-labelledby="q3q5"]', dataTable.rows()[0][4]);
    } catch (err) {
      console.error(err);
    }
  }

  // Click on a button (either 'Work out how much...' or 'Start over')
  async clickOnButton(string) {
    if (string == "Work out how much I could borrow" ) xpath = '#main-container > div:nth-child(1) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__calculate.text--center.clearfix > button'
    else if (string == "Start over") xpath = '[aria-label="Start over"]';
    // click on a selected button
    await this.page.click(xpath);
   }

  // Read the Estimate result
  async verifyEstimate(string) {
    await this.page.waitFor(2000);
    await this.page.waitForSelector('[aria-label="Start over"]');

    xpath = '#main-container > div:nth-child(1) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__result.text--white.clearfix > div.box--left > span.borrow__result__text > span';
    const actualTxt = await this.page.$eval(xpath, el => el.innerText);
    console.log("\n Actual Estimate: " + actualTxt);
    assert.equal(string, actualTxt);
  }

  // Read the Warning message
  async verifyWarningMessage(string) {
    await this.page.waitFor(2000);
    await this.page.waitForSelector('[aria-label="Start over"]');
    xpath = '[aria-live="assertive"]'; 
    const actualTxt = await this.page.$eval(xpath, el => el.innerText);
    console.log("\n Actual Message:" +  actualTxt);
    assert.equal(string, actualTxt);
  }

  // Verify 'Your Earnings' column (2 rows)
  async verifyYourEarnings(dataTable) {    
    try {
      // d. Your income (before tax)
      actualTxt = getValuePart(await (this.page.$eval('[aria-labelledby="q2q1"]', el => el.outerHTML)));
      assert.equal(dataTable.rows()[0][0], actualTxt);

      // f. Your other income
      actualTxt = getValuePart(await (this.page.$eval('[aria-labelledby="q2q2"]', el => el.outerHTML)));
      assert.equal(dataTable.rows()[0][1], actualTxt);
    } catch (err) {
      console.error(err);
    }
  }
  
  // Verify 'Your Expenses' column (5 rows)
  async verifyYourExpenses(dataTable) {
    try {
      // f. Living expenses
      actualTxt = getValuePart(await (this.page.$eval('[aria-labelledby="q3q1"]', el => el.outerHTML)));
      assert.equal(dataTable.rows()[0][0], actualTxt);
      
      // g. Current home loan repayments
      actualTxt = getValuePart(await (this.page.$eval('[aria-labelledby="q3q2"]', el => el.outerHTML)));
      assert.equal(dataTable.rows()[0][1], actualTxt);
      
      // h. Other loan repayments
      actualTxt = getValuePart(await (this.page.$eval('[aria-labelledby="q3q3"]', el => el.outerHTML)));
      assert.equal(dataTable.rows()[0][2], actualTxt);

      // i. Other commitments
      actualTxt = getValuePart(await (this.page.$eval('[aria-labelledby="q3q4"]', el => el.outerHTML)));
      assert.equal(dataTable.rows()[0][3], actualTxt);

      // j. Total credit card limits
      actualTxt = getValuePart(await (this.page.$eval('[aria-labelledby="q3q5"]', el => el.outerHTML)));
      assert.equal(dataTable.rows()[0][4], actualTxt);

    } catch (err) {
      console.error(err);
    }
  }
 
  async closeBrowser() {
    //HomeLoanPage.closeHomeLoanCalPage();
    await this.page.screenshot({path: './screenshots/finalscreen.png'});
    await this.browser.close();
  }
}
  // Function to extract only value out from "value=X"
  function getValuePart(Tmp) {
    return Tmp.slice(Tmp.lastIndexOf("value=")+7,Tmp.lastIndexOf("value=")+8);
  }

setWorldConstructor(HomeLoanCalWorld);
