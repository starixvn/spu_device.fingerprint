declare const InstallTrigger: any;
declare const safari: any;

import { getNetworkIFaceOne } from '@lzwme/get-physical-address';


function getAdr() {
  // getMac().then(mac => console.log(`the MAC address is ${mac}`));
  // getMac('en0').then(mac => console.log(`the MAC address for en0 is ${mac}`));
  // getNetworkIFaceOne().then(item => console.log(`the MAC address is ${item.mac}, the IP address is ${item.address}`));
}

function getEngineBrowser() {
  var prefix = (Array.prototype.slice
    .call(window.getComputedStyle(document.documentElement, ""))
    .join("") 
    .match(/-(moz|webkit|ms)-/))[1];
  console.log(prefix);
}

function detectBrowserName() {
  // OPERA 8.0+
  var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  if(isOpera) return 'Opera';

  // FIREFOX 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if(isFirefox) return 'Firefox';

  // SAFARI 3.0+
  var isSafari = /constructor/i.test(window['HTMLElement']) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  if(isSafari) return 'Safari';

  // INTERNET EXPLORER 6-11
  var isIE = /*@cc_on!@*/false || !!document['documentMode'];
  if(isIE) return 'IE';

  // EDGE 20+
  var isEdge = !isIE && !!window['StyleMedia'];
  if(isEdge) return 'Edge';

  // CHROME 1+
  var isChrome = !!window.chrome;
  if(isChrome) return 'Chrome';

  // // BLINK ENGINE DETECTION
  // var isBlink = (isChrome || isOpera) && !!window.CSS;
  // if(isBlink) return 'Blink';
}

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os;
}

export function getBrowserInfo() {
  getAdr();
  return {
    OSName: getOS(),
    BrowserName: detectBrowserName()
  };
}
