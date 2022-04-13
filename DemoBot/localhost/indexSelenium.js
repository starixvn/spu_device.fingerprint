const {Builder, By, promise, Capabilities} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

(async function example() {
  const options = new firefox.Options();
  options.headless();
  //options.addArguments('--user-agent="Mozilla/4.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.11 Safari/537.36"');
  let driver = await new Builder().forBrowser('firefox')
              .setFirefoxOptions(options)
              .build();
  try {
    await driver.get('http://localhost:44392/Login');

    driver.findElement(By.name("Username")).sendKeys("test");
    driver.findElement(By.name("Password")).sendKeys("1234aa");

    driver.findElement(By.className("btn btn-default")).click();
  } finally {
    await promise.delayed(3000);
    await driver.quit();
  }
})();