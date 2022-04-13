const {
    webkit,
    firefox,
    chromium
  } = require('playwright');
  
  
// let page, browser, context;
const url = 'http://localhost:44392/Login';
// beforeEach(async () => {
//     browser = await engine.launch({ headless: false });
//     context = await browser.newContext();
//     page = await context.newPage(url);
// })

  const simulate = async (engine) => {
  
    const browser = await engine.launch({ headless: false });
    const context = await browser.newContext({
        userAgent: 'my-user-agent'
      });
    const page = await context.newPage();
  
    await page.goto(url);
    await page.fill('input[name="Username"]', "test");
    await page.fill('input[name="Password"]', "1234aa");
    await page.locator('button').click();

    console.log(await page.evaluate(() => navigator.userAgent));
    await page.waitForTimeout(5000);
  
    await browser.close();
  };
  
  simulate(firefox)
//   simulate(webkit)
//   simulate(chromium)