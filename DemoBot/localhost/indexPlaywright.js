const {
    webkit,
    firefox,
    chromium
  } = require('playwright');

const {arrayUA} = require('../Constant/ListUserAgent');
const {arrayUrlLocalhost} = require('../Constant/ListUrl');
  
const url = 'http://localhost:44392/Login';

const simulate = async (engine) => {

  const browser = await engine.launch({ headless: false, viewport: null });
  const ua = arrayUA[Math.floor(Math.random()*arrayUA.length)];   

  const context = await browser.newContext({
      userAgent: ua
    });
  const page = await context.newPage();

  await page.goto(url);
  await page.fill('input[name="Username"]', "test");
  await page.fill('input[name="Password"]', "1234aa");
  await page.locator('button').click();
  
  var redirectUrl = arrayUrlLocalhost[Math.floor(Math.random()*arrayUrlLocalhost.length)];
  await page.goto(redirectUrl);
  
  await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}));

  // await page.waitForTimeout(5000);

  // await browser.close();
};
  
  simulate(firefox);
  simulate(webkit)
  simulate(chromium)