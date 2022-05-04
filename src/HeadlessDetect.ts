let allTestFunctions = [
  {
    name: "NotificationPermissions",
    testFunction: testNotificationPermissions,
    active: 1,
  },
  { name: "UserAgent", testFunction: testUserAgent, active: 1 },
  { name: "ChromeWindow", testFunction: testChromeWindow, active: 1 },
  { name: "Plugins", testFunction: testPlugins, active: 0 },
  { name: "AppVersion", testFunction: testAppVersion, active: 1 },
  { name: "ConnectionRtt", testFunction: testConnectionRtt, active: 1 },
  { name: "Webdriver", testFunction: testWebdriver, active: 1 },
];

//* All Tests *//

function testWebdriver() {
  let webdriver = navigator.webdriver;
  return webdriver ? 1 : 0;
}

// User Agent
function testUserAgent() {
  if (/Headless/.test(window.navigator.userAgent)) {
    // Headless
    return 1;
  } else {
    // Not Headless
    return 0;
  }
}

// Window.Chrome
function testChromeWindow() {
  if (eval.toString().length == 33 && !window.chrome) {
    // Headless
    return 1;
  } else {
    // Not Headless
    return 0;
  }
}

// Notification Permissions
function testNotificationPermissions() {
  const res = navigator.permissions
    .query({ name: "notifications" })
    .then(function (permissionStatus) {
      if (
        Notification.permission === "denied" &&
        permissionStatus.state === "prompt"
      ) {
        // Headless
        return 1;
      } else {
        // Not Headless
        return 0;
      }
    });

  return res;
}

// No Plugins
function testPlugins() {
  let length = navigator.plugins.length;

  return length === 0 ? 1 : 0;
}

// App Version
function testAppVersion() {
  let appVersion = navigator.appVersion;

  return /headless/i.test(appVersion) ? 1 : 0;
}

// Connection Rtt
function testConnectionRtt() {
  let connection = navigator.connection;
  let connectionRtt = connection ? connection.rtt : undefined;

  if (connectionRtt === undefined) {
    return 0; // Flag doesn't even exists so just return NOT HEADLESS
  } else {
    return connectionRtt === 0 ? 1 : 0;
  }
}

//* Main Functions *//

export async function getHeadlessScore() {
  let score = 0;
  let testsRun = 1;

  let resultTest = allTestFunctions.map(async (test) => {
    if (test.active == 1) {
      let result = await test.testFunction();

      score += result;
      testsRun++;

      return test.name + " : " + result;
    }
  });
  return {
    score: await score,
    testsRun: await testsRun,
    testsDetail: (await Promise.all(resultTest)).join(", "),
  };
}
