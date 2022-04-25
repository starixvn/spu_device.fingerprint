const config = {
    headless: true,
    turnOffWebdriver: true,
    redirect: false,
    changeUA: true,
    closeBrowser: true,
    waitingTime: 2000
};
  
const loginInfo = {
    url: "https://fps-demo.nexdev.net/Login",
    username: "test",
    password: "1234aa"
};

module.exports = {
    config,
    loginInfo
};
  