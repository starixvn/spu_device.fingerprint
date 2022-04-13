const puppeteer = require('puppeteer');

async function getBunnies() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const url = "http://ha.nexdev.net:7402/Local07/";
    
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector("#txtUserName");
    await page.type("#txtUserName", "sutest01", {});

    await page.waitForSelector("#txtPassWord");
    await page.type("#txtPassWord", "1234aaAA", {});  
    
    await page.setUserAgent("Mozilla/5.1 Puppeteer (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.7113.93 Safari/537.36");

    await page.click('.btnLogin');
    setTimeout(() => { browser.close(); }, 3000);
}
getBunnies();