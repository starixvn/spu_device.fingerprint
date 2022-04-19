let allTestFunctions = [
  {
    name: "UserAgent",
    testFunction: testUserAgent,
  },
  { name: "ChromeWindow", testFunction: testChromeWindow },
  { name: "Plugins", testFunction: testPlugins },
  { name: "AppVersion", testFunction: testAppVersion },
  { name: "ConnectionRtt", testFunction: testConnectionRtt },
];

//* All Tests *//

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
function testNotificationPermissions(callback) {
  navigator.permissions
    .query({ name: "notifications" })
    .then(function (permissionStatus) {
      if (
        Notification.permission === "denied" &&
        permissionStatus.state === "prompt"
      ) {
        // Headless
        callback(1);
      } else {
        // Not Headless
        callback(0);
      }
    });
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

export function getHeadlessScore() {
  let score = 0;
  let testsRun = 0;

  // Notification Permissions test has to be done using Callbacks
  // That's why it's done separately from all the other tests.
  testNotificationPermissions(function (v) {
    score += v;
    testsRun++;
  });

  allTestFunctions.forEach((test) => {
    score += test.testFunction();
    testsRun++;
  });

  console.log(score);
  console.log(testsRun);
  return score / testsRun + " - (" + `${score}` + " / " + `${testsRun}` + ")";
}
