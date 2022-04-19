const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

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
    const {arrayUrl} = require('./Constant/ListUrl');
    const {config, loginInfo} = require('./Constant/Config');

    const options = new chrome.Options();
    if(config.headless)
        options.headless();

    const driver = await new Builder().forBrowser(browser)
                    .setChromeOptions(options)
                    .build();
    
    if(config.turnOffWebdriver){
        var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
        driver.executeScript(js);
    }

    await driver.get(loginInfo.url);

    driver.findElement(By.name("Username")).sendKeys(loginInfo.username);
    driver.findElement(By.name("Password")).sendKeys(loginInfo.password);

    driver.findElement(By.className("btn btn-default")).click();

    await driver.wait(until.titleIs('Home Page - My ASP.NET Application'), 1000);

    if(config.redirect){
        var redirectUrl = arrayUrl[Math.floor(Math.random()*arrayUrl.length)];
        await driver.get(redirectUrl);
    }
    
    if(config.turnOffWebdriver){
        var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
        driver.executeScript(js);
    }
};

execute('chrome');
