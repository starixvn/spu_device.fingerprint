const config = {
    headless: true,
    turnOffWebdriver: false,
    redirect: false,
    changeUA: false
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
  