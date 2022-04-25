let allTestFunctions = [
  {
    name: "UserAgent",
    testFunction: testUserAgent,
  },
  { name: "ChromeWindow", testFunction: testChromeWindow },
  { name: "Plugins", testFunction: testPlugins },
  { name: "AppVersion", testFunction: testAppVersion },
  { name: "ConnectionRtt", testFunction: testConnectionRtt },
  { name: "Webdriver", testFunction: testWebdriver },
];

//* All Tests *//

function testWebdriver() {
  let webdriver = navigator.webdriver;
  return webdriver ? 1 : 0;
}

// User Agent
function testUserAgent() {
  console.log(window.navigator.userAgent);
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
  let testsRun = 0;
  let testFunction = "";

  score += await testNotificationPermissions();
  testFunction = "NotificationPermissions = " + score + ", ";
  testsRun++;

  allTestFunctions.forEach((test) => {
    let result = test.testFunction();
    score += result;
    testsRun++;
    testFunction += test.name + " = " + result + ", ";
  });

  testFunction = testFunction.substring(0, testFunction.length - 2);

  return `${score}` + " / " + `${testsRun}` + " - (" + testFunction + ")";
}
