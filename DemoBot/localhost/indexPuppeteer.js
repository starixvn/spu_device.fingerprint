const puppeteer = require('puppeteer');

async function getBunnies() {
    const browser = await puppeteer.launch({
        headless: true,
        product: 'firefox'
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

    await page.click('.btn.btn-default'); 
    await page.waitForNavigation('networkidle2');

    const title = await page.title();
    if(title == "Home Page - My ASP.NET Application"){
        await page.click('.btn'); 
    }
    // setTimeout(() => { browser.close(); }, 3000);
}
getBunnies();