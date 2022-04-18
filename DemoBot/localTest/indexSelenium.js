const { Builder, By, until } = require('selenium-webdriver');

// WEB DRIVER
// Opera
// https://github.com/operasoftware/operachromiumdriver/releases
// Firefox
// https://github.com/mozilla/geckodriver/releases
// Chrome
// http://chromedriver.chromium.org/downloads
// Internet Explorer
// https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver
// Microsoft Edge
// https://blogs.windows.com/msedgedev/2015/07/23/bringing-automated-testing-to-microsoft-edge-through-webdriver/

async function execute(browser) {
    const {arrayUrlLocalTest} = require('../Constant/ListUrl');
    const driver = await new Builder().forBrowser(browser).build();

    await driver.get('https://alpha.nexdev.net/Local07/');

    driver.findElement(By.name("txtUserName")).sendKeys("sutest01");
    driver.findElement(By.name("txtPassWord")).sendKeys("1234aaAA");

    driver.findElement(By.className("btnLogin")).click();

    await driver.wait(until.titleIs('Home'), 1000);

    var redirectUrl = arrayUrlLocalTest[Math.floor(Math.random()*arrayUrlLocalTest.length)];
    await driver.get(redirectUrl);

    var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
    driver.executeScript(js);
};

// execute('firefox');
// execute('MicrosoftEdge');
// execute('chrome');
execute('opera');