const config = {
    headless: false,
    turnOffWebdriver: true,
    redirect: true,
    changeUA: true
};
  
const loginInfo = {
    url: "http://localhost:44392/Login",
    username: "test",
    password: "1234aa"
};

module.exports = {
    config,
    loginInfo
};
  