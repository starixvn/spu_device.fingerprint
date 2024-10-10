declare const InstallTrigger: any;
declare const safari: any;

function getEngineBrowser() {
  var prefix = Array.prototype.slice
    .call(window.getComputedStyle(document["documentElement"], ""))
    .join("")
    .match(/-(moz|webkit|ms)-/)[1];
  console.log(prefix);
}

function getBrowserName() : string {
  // OPERA 8.0+
  var isOpera = (!!window.opr || !!window.opera);
  if (isOpera) return "Opera";

  // FIREFOX 1.0+
  var isFirefox = typeof InstallTrigger !== "undefined";
  if (isFirefox) return "Firefox";

  // SAFARI 3.0+
  var isSafari = 
    /constructor/i.test(window["HTMLElement"]) 
    || /apple/i.test(navigator.vendor) && !!window["safari"]
    || (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && safari.pushNotification)
    );
  // var isSafari = /apple/i.test(navigator.vendor) && !!window["safari"];
  if (isSafari) return "Safari";

  // INTERNET EXPLORER 6-11
  var isIE = /*@cc_on!@*/ false || !!document["documentMode"];
  if (isIE) return "IE";

  // EDGE 20+
  var isEdge = !isIE && !!window["StyleMedia"];
  if (isEdge) return "Edge";

  // CHROME 1+
  var isChrome = !!window["chrome"];
  if (isChrome) return "Chrome";
  // // BLINK ENGINE DETECTION
  // var isBlink = (isChrome || isOpera) && !!window.CSS;
  // if(isBlink) return 'Blink';
  return "Other";
}

function getOS(): string {
  var userAgent = navigator.userAgent,
    platform = navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac";
  } else if (isIOS()) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

function isIOS() {
  const arrDevice = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];
  const platform = navigator.platform;
  return (!!platform && !!arrDevice.find(v => platform.includes(v)))
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function iOSversion() {

  if (isIOS()) { // <-- Use the one here above
    if (window['indexedDB']) { return 'iOS 8 and up'; }
    if (window['SpeechSynthesisUtterance']) { return 'iOS 7'; }
    if (window['webkitAudioContext']) { return 'iOS 6'; }
    if (window['matchMedia']) { return 'iOS 5'; }
    if (window['history'] && 'pushState' in window['history']) { return 'iOS 4'; }
    return 'iOS 3 or earlier';
  }

  return 'Not an iOS device';
}

function getMobileDevice(){
  return window.matchMedia("only screen and (max-width: 760px)").matches;
}

interface biResult {
  OSName: string;
  BrowserName: string;
  Platform: string;
  Vendor: string;
  IsMobileDevice: number
}

export function getBrowserInfo() : biResult {
  return {
    OSName: getOS(),
    BrowserName: getBrowserName(),
    Platform: navigator.platform,
    Vendor: navigator.vendor,
    IsMobileDevice: getMobileDevice() ? 1 : 0,
  };
}
