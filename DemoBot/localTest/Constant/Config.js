const config = {
    headless: true,
    turnOffWebdriver: false,
    redirect: false,
    changeUA: false,
    closeBrowser: true,
    waitingTime: 2000
};
  
const loginInfo = {
    url: "https://alpha.nexdev.net/Local07/",
    username: "sutest01",
    password: "1234aaAA"
};

module.exports = {
    config,
    loginInfo
};
  