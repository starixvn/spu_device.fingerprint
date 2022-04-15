const {
    webkit,
    firefox,
    chromium
  } = require('playwright');
  
const url = 'https://alpha.nexdev.net/Local07/';
const {arrayUrlLocalTest} = require('../Constant/ListUrl');

  const simulate = async (engine) => {
  
    const browser = await engine.launch({ headless: false });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.2 Playwright (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.7113.93 Safari/537.36'
      });
    const page = await context.newPage();
  
    await page.goto(url);
    await page.fill('input[name="txtUserName"]', "sutest01");
    await page.fill('input[name="txtPassWord"]', "1234aaAA");
    await page.locator('.btnLogin').click();
  
    var redirectUrl = arrayUrlLocalTest[Math.floor(Math.random()*arrayUrlLocalTest.length)];
    await page.goto(redirectUrl);

    await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}));
  };
  
  simulate(firefox);