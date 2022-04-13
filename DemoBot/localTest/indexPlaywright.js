const {
    webkit,
    firefox,
    chromium
  } = require('playwright');
  
const url = 'http://ha.nexdev.net:7402/Local07/';

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

    await page.waitForTimeout(5000);
  
    await browser.close();
  };
  
  simulate(firefox);