const HEADLESS = 1;
const HEADFUL = 0;
const UNDEFINED = -1;

function testWebdriver() {
  let webdriver = navigator.webdriver;
  return webdriver ? HEADLESS : HEADFUL;
}

function testUserAgent() {
  let agent = navigator.userAgent;

  return /headless/i.test(agent) ? HEADLESS : HEADFUL;
}

// Test for app version (almost equal to user agent)
function testAppVersion() {
  let appVersion = navigator.appVersion;

  return /headless/i.test(appVersion) ? HEADLESS : HEADFUL;
}

// Test for plugins
function testPlugins() {
  let length = navigator.plugins.length;

  return length === 0 ? UNDEFINED : HEADFUL;
}

// Test for mime type
function testMime() {
  let length = navigator.mimeTypes.length;

  return length === 0 ? UNDEFINED : HEADFUL;
}

// Test for languages
function testLanguages() {
  let language = navigator.language;
  let languagesLength = navigator.languages.length;

  if (!language || languagesLength === 0) return HEADLESS;
  return HEADFUL;
}

// Test for chrome element (especific for google chrome browser)
function testChrome() {
  let chrome = window.chrome;

  return chrome ? HEADFUL : UNDEFINED;
}

// Test for permission
function testPermission() {
  let permissionStatus, notificationPermission;

  if (!navigator.permissions) {
    return UNDEFINED;
  }
  permissionStatus = navigator.permissions.query({
    name: "notifications",
  });
  notificationPermission = Notification.permission;

  if (
    notificationPermission === "denied" &&
    permissionStatus.state === "prompt"
  )
    return HEADLESS;
  return HEADFUL;
}

// Test for outerHeight and outerWidth
function testOuter() {
  let outerHeight = window.outerHeight;
  let outerWidth = window.outerWidth;

  return outerHeight === 0 && outerWidth === 0 ? HEADLESS : HEADFUL;
}

export function testBrowser() {
  let results = "";
  let tests = [
    { name: "UserAgent", testFunction: testUserAgent },
    { name: "AppVersion", testFunction: testAppVersion },
    { name: "Plugins", testFunction: testPlugins },
    { name: "Mime", testFunction: testMime },
    { name: "Languages", testFunction: testLanguages },
    { name: "Webdriver", testFunction: testWebdriver },
    { name: "Chrome", testFunction: testChrome },
    { name: "Permission", testFunction: testPermission },
    { name: "OuterDimensions", testFunction: testOuter },
  ];

  tests.forEach(function(test){
    let tested = test.testFunction();

    results += JSON.stringify(test.name) + ":" + tested + ", ";
  });

  return "{" + results.substring(0, results.length - 2) + "}";
}
