const { Builder, By, until } = require('selenium-webdriver');

async function execute(browser) {
    const {arrayUrlLocalhost} = require('../Constant/ListUrl');
    const driver = await new Builder().forBrowser(browser).build();

    var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
    driver.executeScript(js);

    await driver.get('http://localhost:44392/Login');

    driver.findElement(By.name("Username")).sendKeys("test");
    driver.findElement(By.name("Password")).sendKeys("1234aa");

    driver.findElement(By.className("btn btn-default")).click();

    await driver.wait(until.titleIs('Home Page - My ASP.NET Application'), 1000);

    var redirectUrl = arrayUrlLocalhost[Math.floor(Math.random()*arrayUrlLocalhost.length)];
    await driver.get(redirectUrl);

    var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
    driver.executeScript(js);
};

// execute('firefox');
// execute('MicrosoftEdge');
// execute('chrome');
execute('opera');
