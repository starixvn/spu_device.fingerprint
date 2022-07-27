const config = {
    headless: false,
    incognito: false,
    turnOffWebdriver: false,
    redirect: false,
    changeUA: true,
    closeBrowser: false,
    waitingTime: 2000
};
  
const loginInfo = {
    url: "http://localhost:44392/Login/Index",
    username: "test1",
    password: "1234aa"
};

module.exports = {
    config,
    loginInfo
};
  