const puppeteer = require('puppeteer');
const {arrayUA} = require('../Constant/ListUserAgent');
const {arrayUrlLocalhost} = require('../Constant/ListUrl');

async function getBunnies() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
        // product: 'firefox'
        // executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const url = "http://localhost:44392/Login";

    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector("#Username");
    await page.type("#Username", "test1", {});

    await page.waitForSelector("#Password");
    await page.type("#Password", "1234aa", {});  

    var ua = arrayUA[Math.floor(Math.random()*arrayUA.length)];    
    await page.setUserAgent(ua);

    await page.click('.btn.btn-default'); 
    await page.waitForNavigation('networkidle2');

    const title = await page.title();
    if(title == "Home Page - My ASP.NET Application"){

        var redirectUrl = arrayUrlLocalhost[Math.floor(Math.random()*arrayUrlLocalhost.length)];
        await page.goto(redirectUrl);
        
        await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}))
        
    }
    // setTimeout(() => { browser.close(); }, 3000);
}
getBunnies();