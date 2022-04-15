const {Builder, By, promise, Capabilities, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const {arrayUrlLocalTest} = require('../Constant/ListUrl');

(async function example() {
  const options = new firefox.Options();
  //options.headless();
  let driver = await new Builder().forBrowser('firefox')
              .setFirefoxOptions(options)
              .build();

  const url = "https://alpha.nexdev.net/Local07/";

  try {
    
    await driver.get(url);

    driver.findElement(By.name("txtUserName")).sendKeys("sutest01");
    driver.findElement(By.name("txtPassWord")).sendKeys("1234aaAA");

    driver.findElement(By.className("btnLogin")).click();

    await driver.wait(until.titleIs('Home'), 100);

    var redirectUrl = arrayUrlLocalTest[Math.floor(Math.random()*arrayUrlLocalTest.length)];
    await driver.get(redirectUrl);

    var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
    driver.executeScript(js);

  } finally {
    // await promise.delayed(3000);
    // await driver.quit();
  }
})();