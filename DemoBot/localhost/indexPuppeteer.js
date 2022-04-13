const puppeteer = require('puppeteer');

async function getBunnies() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    });
    const url = "http://localhost:44392/Login";
    
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("#Username");
    await page.type("#Username", "test1", {});
    await page.waitForSelector("#Password");
    await page.type("#Password", "1234aa", {});  

    // await page.waitForSelector("#FpsKey");
    // await page.type("#FpsKey", "1234aa", {}); 

    await page.click('.btn.btn-default');
    setTimeout(() => { browser.close(); }, 3000);
}
getBunnies();