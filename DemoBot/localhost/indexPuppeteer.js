const puppeteer = require('puppeteer');
const {arrayUA} = require('./Constant/ListUserAgent');
const {arrayUrl} = require('./Constant/ListUrl');
const {config, loginInfo} = require('./Constant/Config');

async function execute() {
    const browser = await puppeteer.launch({
        headless: config.headless,
        defaultViewport: null,
        // product: 'firefox' // chrome, firefox
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        // executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    });

    // const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage();
    await page.goto(loginInfo.url);

    await page.waitForSelector("#Username");
    await page.type("#Username", loginInfo.username, {});

    await page.waitForSelector("#Password");
    await page.type("#Password", loginInfo.password, {});  
    
    if(config.turnOffWebdriver){
        await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}));
    }

    if(config.changeUA){
        var ua = arrayUA[Math.floor(Math.random()*arrayUA.length)];    
        await page.setUserAgent(ua);
    }

    await Promise.all([
        page.waitForNavigation(),
        page.click('.btn.btn-default')
    ]);

    const title = await page.title();
    if(title == "Home Page - My ASP.NET Application"){

        if(config.redirect){
            var redirectUrl = arrayUrl[Math.floor(Math.random()*arrayUrl.length)];
            await page.goto(redirectUrl);
        }
        
        if(config.turnOffWebdriver){
            await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}))
        }
        
    }
    // setTimeout(() => { browser.close(); }, 3000);
}
execute();