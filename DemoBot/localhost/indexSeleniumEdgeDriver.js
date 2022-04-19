const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

async function execute(browser) {
    const {arrayUrl} = require('./Constant/ListUrl');
    const {config, loginInfo} = require('./Constant/Config');

    const options = new edge.Options();
    if(config.headless)
        options.headless();

    const driver = await new Builder().forBrowser(browser)
                    .setEdgeOptions(options)
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
