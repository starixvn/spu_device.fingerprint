const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const {Builder, By, promise, Capabilities, until} = webdriver;

const {arrayUA} = require('../Constant/ListUserAgent');
const {arrayUrlLocalhost} = require('../Constant/ListUrl');

async function exampleFirefox() {
  const options = new firefox.Options();  
  const url = "http://localhost:44392/Login";

  // const capabilities = Capabilities.firefox();

  let driver = await new Builder().forBrowser('firefox')
              .setFirefoxOptions(options)
              // .withCapabilities(capabilities)
              .build();

  try {


    await driver.get(url);

    var js1 = "Object.defineProperty(navigator, 'userAgent', {get: function () { return 'Mozilla/5.0 Selenium (Windows NT 6.2; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0)'; }})";
    driver.executeScript(js1);

    driver.findElement(By.name("Username")).sendKeys("test");
    driver.findElement(By.name("Password")).sendKeys("1234aa");

    // driver.findElement(By.className("btn btn-default")).click();

    // await driver.wait(until.titleIs('Home Page - My ASP.NET Application'), 1000);

    // var redirectUrl = arrayUrlLocalhost[Math.floor(Math.random()*arrayUrlLocalhost.length)];
    // await driver.get(redirectUrl);

    // var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
    // driver.executeScript(js);


  } finally {
    // await promise.delayed(3000);
    // await driver.quit();
  }
};


async function exampleChrome() {
  const options = new chrome.Options();  
  const url = "http://localhost:44392/Login";

  // const capabilities = Capabilities.firefox();

  let driver = await new Builder().forBrowser('chrome')
              .setChromeOptions(options)
              // .withCapabilities(capabilities)
              .build();

  try {


    await driver.get(url);

    var js1 = "Object.defineProperty(navigator, 'userAgent', {get: function () { return 'Mozilla/5.0 Selenium (Windows NT 6.2; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0)'; }})";
    driver.executeScript(js1);

    driver.findElement(By.name("Username")).sendKeys("test");
    driver.findElement(By.name("Password")).sendKeys("1234aa");

    // driver.findElement(By.className("btn btn-default")).click();

    // await driver.wait(until.titleIs('Home Page - My ASP.NET Application'), 1000);

    // var redirectUrl = arrayUrlLocalhost[Math.floor(Math.random()*arrayUrlLocalhost.length)];
    // await driver.get(redirectUrl);

    // var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
    // driver.executeScript(js);


  } finally {
    // await promise.delayed(3000);
    // await driver.quit();
  }
};

// exampleFirefox();
exampleChrome();