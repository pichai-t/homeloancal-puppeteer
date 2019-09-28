
const puppeteer = require('puppeteer');

const HOMELOANCAL_URL = "https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/";

var browser = puppeteer.launch({
    headless: false,
    slowMo: 20,
    args: ['--start-maximized', '--window-size=1040,1040'] 
    });



class HomeLoanPage {

    constructor() {
        global.browser = browser
        this.page = browser.newPage();
    }

    // Open
    async openHomeLoanCalPage(params) {

        await this.page.goto(HOMELOANCAL_URL, {waitUntil: 'networkidle2'});
    }




    // Close
    closeHomeLoanCalPage() { 
        
        console.log ("HELLO TESTING... ");
        this.browser.close();
    }

}

module.exports = new HomeLoanPage(); 