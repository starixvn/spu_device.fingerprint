const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

// Firefox
// https://github.com/mozilla/geckodriver/releases
async function execute(browser) {
    const {arrayUrl} = require('./Constant/ListUrl');
    const {config, loginInfo} = require('./Constant/Config');

    // default firefox
    const options = new firefox.Options();
    if(config.headless)
        options.headless();
    
    const driver = await new Builder().forBrowser(browser)
                    .setFirefoxOptions(options)
                    .build();

    if(config.turnOffWebdriver){
        var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
        driver.executeScript(js);
    }

    await driver.get(loginInfo.url);

    driver.findElement(By.name("txtUserName")).sendKeys(loginInfo.username);
    driver.findElement(By.name("txtPassWord")).sendKeys(loginInfo.password);

    driver.findElement(By.className("btnLogin")).click();

    await driver.wait(until.titleIs('Home'), 1000);

    if(config.redirect){
        var redirectUrl = arrayUrl[Math.floor(Math.random()*arrayUrl.length)];
        await driver.get(redirectUrl);
    }
    
    if(config.turnOffWebdriver){
        var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
        driver.executeScript(js);
    }
};

execute('firefox');
