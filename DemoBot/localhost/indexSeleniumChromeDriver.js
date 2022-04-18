var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

async function example() {
    const {arrayUrlLocalhost} = require('../Constant/ListUrl');
    console.log('path', path);

    var service = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(service);

    var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    // Navigate to google.com, enter a search.
    await driver.get('http://localhost:44392/Login');

    driver.findElement(webdriver.By.name("Username")).sendKeys("test");
    driver.findElement(webdriver.By.name("Password")).sendKeys("1234aa");

    driver.findElement(webdriver.By.className("btn btn-default")).click();

    await driver.wait(webdriver.until.titleIs('Home Page - My ASP.NET Application'), 1000);

    var redirectUrl = arrayUrlLocalhost[Math.floor(Math.random()*arrayUrlLocalhost.length)];
    await driver.get(redirectUrl);

    var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
    driver.executeScript(js);

    // driver.quit();
};

example();