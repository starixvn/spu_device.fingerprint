const puppeteer = require('puppeteer');
const {arrayUA} = require('./Constant/ListUserAgent');
const {arrayUrl} = require('./Constant/ListUrl');
const {config, loginInfo} = require('./Constant/Config');

async function execute() {
    
    var argv = require('minimist')(process.argv.slice(2));
    const browser = await getBrowser(argv.browser);
    
    // const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage();
    await page.goto(loginInfo.url);

    await page.waitForSelector("#txtUserName");
    await page.type("#txtUserName", loginInfo.username, {});

    await page.waitForSelector("#txtPassWord");
    await page.type("#txtPassWord", loginInfo.password, {});  

    if(config.turnOffWebdriver){
        await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}));
    }
    
    if(config.changeUA){
        var ua = arrayUA[Math.floor(Math.random()*arrayUA.length)];    
        await page.setUserAgent(ua);
    }
      
    await Promise.all([
        page.waitForNavigation(),
        page.click('.btnLogin')
    ]);

    const title = await page.title();
    
    if(title == "Home"){

        if(config.redirect){
            var redirectUrl = arrayUrl[Math.floor(Math.random()*arrayUrl.length)];
            await page.goto(redirectUrl);
        }
        
        if(config.turnOffWebdriver){
            await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}))
        }
    }

    if(config.closeBrowser){
        setTimeout(() => { browser.close(); }, config.waitingTime);
    }
}

async function getBrowser(browser) {
    if(browser == "firefox"){
        return await puppeteer.launch({
            headless: config.headless,
            defaultViewport: null,
            product: 'firefox'
            // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            // executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        });
    }
    if(browser == "chrome"){
        return await puppeteer.launch({
            headless: config.headless,
            defaultViewport: null,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            // executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        });
    }
    if(browser == "edge"){
        return await puppeteer.launch({
            headless: config.headless,
            defaultViewport: null,
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        });
    }
    // default
    return await puppeteer.launch({
        headless: config.headless,
        defaultViewport: null
    });
}

execute();