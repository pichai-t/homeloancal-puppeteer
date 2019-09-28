
const puppeteer = require('puppeteer');
const { Given, When, Then, Before, After } = require("cucumber");
// const { setWorldConstructor } = require('cucumber');

// const World = function () {
// }

// setWorldConstructor(World);

async function clickOnXPath(page, xPath) {
  const example1 = await page.$x(xPath);   // //label[contains(.,'Single')]
  await example1[0].click();  
}

(async () => {

  try {
    const browser = await puppeteer.launch( {headless: true} );
    
    const page = await browser.newPage();
    //page.setViewport
    
    await page.goto("https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/");

    // a. Click on Single
    // const example1 = await page.$x('//label[contains(.,"Single")]');   
    // await example1[0].click();  

    await page.click('[for="application_type_single"]');

    // b.
    await page.type('[title="Number of dependants"]', '4');

    // c.    
    await page.waitForSelector('[for="borrow_type_home"]');
    await page.click('[for="borrow_type_home"]');     

    // d.
    await page.type('[aria-labelledby="q2q1"]', '99000');

    // e. 
    await page.type('[aria-labelledby="q2q2"]', '10000');

    // f.
    await page.type('[aria-labelledby="q3q1"]', '500');

    // g.
    await page.type('[aria-labelledby="q3q2"]', '0');

    // h.
    await page.type('[aria-labelledby="q3q3"]', '100');

    // i.
    await page.type('[aria-labelledby="q3q4"]', '0');

    // j.
    await page.type('[aria-labelledby="q3q5"]', '10000');

  
    // click on 'work out how much ...' button
    await page.click('#main-container > div:nth-child(1) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__calculate.text--center.clearfix > button')

    await page.waitFor(2000);
    await page.waitForSelector('[aria-label="Start over"]')

    const txt = await page.$eval('#main-container > div:nth-child(1) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__result.text--white.clearfix > div.box--left > span.borrow__result__text > span', el => el.innerText);
    console.log((txt));
    // 
    await page.screenshot({path: 'finalscreen.png'});
                       
    console.log("END!")

    await browser.close();

   } catch (err) {
     console.error(err);
   }

})();
