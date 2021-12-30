import { IOS, IResult, UAParser } from "ua-parser-js";

interface UAResult extends IResult {
  isDesktop: boolean;
  isMobile: boolean;
}

export function getDeviceInfo(): UAResult {
  const parser = new UAParser();
  const result = parser.getResult();

  const isMobile =
    isMobileAndroid(result.ua) ||
    isMobileBlackBerry(result.ua) ||
    isMobileIOS(result.ua) ||
    isMobileOpera(result.ua) ||
    isMobileWindows(result.ua);

  const isDesktop =
    isWindows(result.os) ||
    isMac(result.os) ||
    isLinux(result.os) ||
    isSolaris(result.os) ||
    isUbuntu(result.os);

  return {
    ua: result.ua,
    device: result.device,
    browser: result.browser,
    engine: result.engine,
    os: result.os,
    cpu: result.cpu,
    isMobile: isMobile,
    isDesktop: isDesktop,
  };
}

function isWindows(os: IOS): boolean {
  return /Windows/i.test(os.name);
}

function isMac(os: IOS): boolean {
  return /Mac/i.test(os.name);
}

function isLinux(os: IOS): boolean {
  return /Linux/i.test(os.name);
}

function isSolaris(os: IOS): boolean {
  return /Solaris/i.test(os.name);
}

function isUbuntu(os: IOS): boolean {
  return /Ubuntu/i.test(os.name);
}

function isMobileAndroid(ua: string): boolean {
  if (ua.match(/Android/i)) {
    return true;
  }
  return false;
}

function isMobileOpera(ua: string): boolean {
  if (ua.match(/Opera Mini/i)) {
    return true;
  }
  return false;
}

// Is Mobile Windows.  Check if the browser is on a windows mobile device.
function isMobileWindows(ua: string): boolean {
  if (ua.match(/IEMobile/i)) {
    return true;
  }
  return false;
}

// Is Mobile BlackBerry.  Check if the browser is on a blackberry mobile device.
function isMobileBlackBerry(ua: string): boolean {
  if (ua.match(/BlackBerry/i)) {
    return true;
  }
  return false;
}

// Is Mobile iOS.  Check if the browser is on an Apple iOS device.
function isMobileIOS(ua: string): boolean {
  if (ua.match(/iPhone|iPad|iPod/i)) {
    return true;
  }
  return false;
}
