const puppeteer = require('puppeteer');
const {arrayUA} = require('../Constant/ListUserAgent');
const {arrayUrlLocalTest} = require('../Constant/ListUrl');

async function getBunnies() {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
        // product: 'firefox'
        // executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const url = "https://alpha.nexdev.net/Local07/";
    
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector("#txtUserName");
    await page.type("#txtUserName", "sutest01", {});

    await page.waitForSelector("#txtPassWord");
    await page.type("#txtPassWord", "1234aaAA", {});  

    var ua = arrayUA[Math.floor(Math.random()*arrayUA.length)];    
    await page.setUserAgent(ua);
      
    await Promise.all([
        page.waitForNavigation(),
        page.click('.btn.btn-default')
    ]);

    const title = await page.title();
    
    if(title == "Home"){

        var redirectUrl = arrayUrlLocalTest[Math.floor(Math.random()*arrayUrlLocalTest.length)];
        await page.goto(redirectUrl);

        await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}))

    }

    // setTimeout(() => { browser.close(); }, 3000);
}
getBunnies();