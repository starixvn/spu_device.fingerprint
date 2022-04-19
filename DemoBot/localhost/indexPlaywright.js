const {
    webkit,
    firefox,
    chromium
  } = require('playwright');

const {arrayUA} = require('./Constant/ListUserAgent');
const {arrayUrl} = require('./Constant/ListUrl');
const {config, loginInfo} = require('./Constant/Config');

const execute = async (engine) => {

  const browser = await engine.launch({ headless: config.headless, viewport: null });
  
  let context = await browser.newContext({});

  if(config.changeUA){
    const ua = arrayUA[Math.floor(Math.random()*arrayUA.length)];
    context = await browser.newContext({
        userAgent: ua
      });
  }   

  const page = await context.newPage();

  await page.goto(loginInfo.url);
  await page.fill('input[name="Username"]', loginInfo.username);
  await page.fill('input[name="Password"]', loginInfo.password);
  await page.locator('button').click();
  
  if(config.redirect){
    var redirectUrl = arrayUrl[Math.floor(Math.random()*arrayUrl.length)];
    await page.goto(redirectUrl);
  }
  
  if(config.turnOffWebdriver){
    await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}));
  }

  // await page.waitForTimeout(5000);

  // await browser.close();
};
  
execute(firefox);
// execute(webkit)
// execute(chromium)