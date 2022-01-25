interface UAResult {
  ua: string;
  isDesktop: boolean;
  isMobile: boolean;
}

export function getDeviceInfo(): UAResult {
  const userAgent = navigator.userAgent;

  const isMobile =
    isMobileAndroid(userAgent) ||
    isMobileBlackBerry(userAgent) ||
    isMobileIOS(userAgent) ||
    isMobileOpera(userAgent) ||
    isMobileWindows(userAgent);

  const isDesktop =
    isWindows(userAgent) ||
    isMac(userAgent) ||
    isLinux(userAgent) ||
    isSolaris(userAgent) ||
    isUbuntu(userAgent);

  return {
    ua: userAgent,
    isMobile: isMobile,
    isDesktop: isDesktop,
  };
}

function isWindows(userAgent: string): boolean {
  return /Windows/i.test(userAgent);
}

function isMac(userAgent: string): boolean {
  return /Mac/i.test(userAgent);
}

function isLinux(userAgent: string): boolean {
  return /Linux/i.test(userAgent);
}

function isSolaris(userAgent: string): boolean {
  return /Solaris/i.test(userAgent);
}

function isUbuntu(userAgent: string): boolean {
  return /Ubuntu/i.test(userAgent);
}

function isMobileAndroid(userAgent: string): boolean {
  if (userAgent.match(/Android/i)) {
    return true;
  }
  return false;
}

function isMobileOpera(userAgent: string): boolean {
  if (userAgent.match(/Opera Mini/i)) {
    return true;
  }
  return false;
}

// Is Mobile Windows.  Check if the browser is on a windows mobile device.
function isMobileWindows(userAgent: string): boolean {
  if (userAgent.match(/IEMobile/i)) {
    return true;
  }
  return false;
}

// Is Mobile BlackBerry.  Check if the browser is on a blackberry mobile device.
function isMobileBlackBerry(userAgent: string): boolean {
  if (userAgent.match(/BlackBerry/i)) {
    return true;
  }
  return false;
}

// Is Mobile iOS.  Check if the browser is on an Apple iOS device.
function isMobileIOS(userAgent: string): boolean {
  if (userAgent.match(/iPhone|iPad|iPod/i)) {
    return true;
  }
  return false;
}
