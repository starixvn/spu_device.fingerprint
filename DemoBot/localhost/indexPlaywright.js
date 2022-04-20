const {
    webkit,
    firefox,
    chromium
  } = require('playwright');

const {arrayUA} = require('./Constant/ListUserAgent');
const {arrayUrl} = require('./Constant/ListUrl');
const {config, loginInfo} = require('./Constant/Config');

async function execute(){

  const engine = getEngine();
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
  
  await page.waitForTimeout(3000);
  if(config.redirect){
    var redirectUrl = arrayUrl[Math.floor(Math.random()*arrayUrl.length)];
    await page.goto(redirectUrl);
  }
  
  if(config.turnOffWebdriver){
    await page.evaluate(() => Object.defineProperty(navigator, 'webdriver', {get: () => false}));
  }

  if(config.closeBrowser && config.waitingTime > 0){
    await page.waitForTimeout(config.waitingTime);
    await browser.close();
  }
};
  
function getEngine() {
  const argv = require('minimist')(process.argv.slice(2));

  if(argv.browser == "chromium"){
    console.log(argv.browser);
    return chromium;
  }
  if(argv.browser == "firefox"){
    return firefox;
  }
  if(argv.browser == "webkit"){
    return webkit;
  }
  return chromium;
}

execute()