const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

// WEB DRIVER
// Opera
// https://github.com/operasoftware/operachromiumdriver/releases
// Firefox
// https://github.com/mozilla/geckodriver/releases
// https://ftp.mozilla.org/pub/firefox/releases/?_gl=1*1mkh5kz*_ga*MTEwOTkwMDk3Ny4xNjc4ODY3MTQ3*_ga_2VC139B3XV*MTY5NDU3Mjc0MS4xLjEuMTY5NDU3MjgxMy4wLjAuMA..
// Chrome
// http://chromedriver.chromium.org/downloads
// Internet Explorer
// https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver
// Microsoft Edge
// https://blogs.windows.com/msedgedev/2015/07/23/bringing-automated-testing-to-microsoft-edge-through-webdriver/

async function execute() {
    const {arrayUrl} = require('./Constant/ListUrl');
    const {config, loginInfo} = require('./Constant/Config');

    // default firefox
    const options = new firefox.Options();
    if(config.headless)
        options.headless();
    
    const driver = await new Builder().forBrowser('firefox')
                    .setFirefoxOptions(options)
                    .build();

    if(config.turnOffWebdriver){
        var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
        driver.executeScript(js);
    }

    await driver.get(loginInfo.url);

    // driver.findElement(By.name("Username")).sendKeys(loginInfo.username);
    // driver.findElement(By.name("Password")).sendKeys(loginInfo.password);

    // driver.findElement(By.className("btn btn-default")).click();
    
    const data1 = await driver.executeScript(() => {
        const canvas = document.getElementById('canvas'); 
        const gl = canvas.getContext('webgl'); 
        return gl.VERSION;
       });
 
       console.log(data1);

    // const data1 = await driver.executeScript(() => {
    //     return navigator.permissions.query({ name: "notifications" }).then(function (permissionStatus) {
    //         return [Notification.permission, permissionStatus.state];
    //     });     
    //    });
 
    //    console.log(data1);

    // const data = await driver.executeScript(() => {
    //     return navigator.permissions.query({ name: "notifications" }).then(function (permissionStatus) {
    //    if (Notification.permission === "denied" && permissionStatus.state === "prompt") {
    //      // Headless
    //      return 1;
    //    } else {
    //      // Not Headless
    //      return 0;
    //    }});        
    //    });
 
    //    console.log(data);

    // await driver.wait(until.titleIs('Home Page - My ASP.NET Application'), 1000);

    // if(config.redirect){
    //     var redirectUrl = arrayUrl[Math.floor(Math.random()*arrayUrl.length)];
    //     await driver.get(redirectUrl);
    // }
    
    // if(config.turnOffWebdriver){
    //     var js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})";
    //     driver.executeScript(js);
    // }

    // if(config.closeBrowser){
    //     await driver.sleep(config.waitingTime);
    //     driver.quit();
    // }
};

execute();
