const config = {
    headless: false,
    incognito: true,
    turnOffWebdriver: false,
    redirect: false,
    changeUA: false,
    closeBrowser: false,
    waitingTime: 2000
};
  
const loginInfo = {
    url: "http://localhost:44392/Login/Index",
    username: "test",
    password: "1234aa"
};

module.exports = {
    config,
    loginInfo
};
  