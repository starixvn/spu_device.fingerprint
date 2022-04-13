const {Builder, By, promise, Capabilities} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

(async function example() {
  const options = new firefox.Options();
  options.addArguments(
    "--verbose",
    "--disable-web-security",
    "--ignore-certificate-errors",
    "--allow-running-insecure-content",
    "--allow-insecure-localhost",
    "--no-sandbox",
    "--disable-gpu"
   );
   // options.headless();
   // options.addArguments("headless");
  // options.addArguments("no-sandbox");
  // options.addArguments("window-size=1200x600");
  // options.addArguments("user-agent=ABC");
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