const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:44392/Login');

    driver.findElement(By.name("Username")).sendKeys("test");
    driver.findElement(By.name("Password")).sendKeys("1234aa");

    driver.findElement(By.className("btn btn-default")).click();

    // const expected_title = "Home Page - My ASP.NET Application";
    // const actual_title = driver.getTitle();

    // // Check successfully
    // if (expected_title == actual_title) {
    //   console.log("Login Successfull!");
    // }
    // else{
    //   console.log('actual_title', actual_title);
    //   console.log("Login Failed!");
    // }

    // await driver.manage().setTimeouts( { implicit: 5000 } );
    //driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);

  } finally {
    // driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
    // await driver.quit();
  }
})();