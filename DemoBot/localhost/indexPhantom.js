const phantom = require('phantom');

(async function() {
    console.log('start');
  const instance = await phantom.create();
  const page = await instance.createPage();

  //await page.property('viewportSize', { width: 1024, height: 600 });
  page.open('http://ha.nexdev.net:7402/Local07/', function (s) {
    console.log('a');

    // const username = document.getElementById('Username');
    // console.log('username', username);
    // username.value = 'test';

    // const password = document.getElementById('Password');
    // console.log('password', password);
    // password.value = '1234aa';

    // const button = document.getElementsByClassName('btn btn-default');
    // console.log('button', button);
    // click(document.querySelector('button'));
    // button.click();
  });
  //await instance.exit();
})();