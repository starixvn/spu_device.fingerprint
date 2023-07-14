
function countTruthy(values) {
    return values.reduce(function (sum, value) {         
        return sum + (value ? 1 : 0); 
    }, 0);
}
// For Chrome
function isChromium() {
    var w = window;
    var n = navigator;
    return (countTruthy([
        'webkitPersistentStorage' in n,
        'webkitTemporaryStorage' in n,
        n.vendor.indexOf('Google') === 0,
        'webkitResolveLocalFileSystemURL' in w,
        'BatteryManager' in w,
        'webkitMediaStream' in w,
        'webkitSpeechGrammar' in w,
    ]) >= 4);
}

//For Firefox
function isGecko() {
    var _a, _b;
    var w = window;
    return (countTruthy([
        'buildID' in navigator,
        'MozAppearance' in ((_b = (_a = document.documentElement) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0 ? _b : {}),
        'onmozfullscreenchange' in w,
        'mozInnerScreenX' in w,
        'CSSMozDocumentRule' in w,
        'CanvasCaptureMediaStream' in w,
    ]) >= 4);
}

//For IE
function isTrident() {
    var w = window;
    var n = navigator;
    return (countTruthy([
        'MSCSSMatrix' in w,
        'msSetImmediate' in w,
        'msIndexedDB' in w,
        'msMaxTouchPoints' in n,
        'msPointerEnabled' in n,
    ]) >= 4);
}

// For Safari
function isWebKit() {
    var w = window;
    var n = navigator;
    return (countTruthy([
        'ApplePayError' in w,
        'CSSPrimitiveValue' in w,
        'Counter' in w,
        n.vendor.indexOf('Apple') === 0,
        'getStorageUpdates' in n,
        'WebKitMediaKeys' in w,
    ]) >= 4);
}


function isAndroid() {
    var isItChromium = isChromium();
    var isItGecko = isGecko();
    
    if (!isItChromium && !isItGecko) {
        return false;
    }
    var w = window;
    return (countTruthy([
        'onorientationchange' in w,
        'orientation' in w,
        isItChromium && !('SharedWorker' in w),
        isItGecko && /android/i.test(navigator.appVersion),
    ]) >= 2);
}

function isIOS()
{
    var isItWebKit = isWebKit();

    if(!isItWebKit) return false;

    var w = window;

    return (countTruthy([
        'safari' in w,
        ('DeviceMotionEvent' in w),
        ('ongestureend' in w),
        ('standalone' in navigator),
    ]) >= 3);
}

export function isMobile()
{
    var isItTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    var isItAndroid = isAndroid();
    var isItIOS = isIOS();
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height; 
    
    var isItResult = (countTruthy([
        isItAndroid,
        isItIOS,
        isItTouchDevice,
        (screenWidth <= 1024 && screenHeight <= 1024),
        (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.platform))
    ]) >= 3)
    
    return {
        result : isItResult,
        isItTouchDevice: isItTouchDevice,
        isItAndroid: isItAndroid,
        isItIOS: isItIOS,
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        platform: navigator.platform
    };     
}

export function isDesktop()
{
    var isItTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var isItTrident = isTrident();
    return {
        result: !isMobile().result || (!isItTouchDevice && (screenWidth > 1024 || screenHeight > 1024)) || isItTrident,
        isItTouchDevice: isItTouchDevice,
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        isItTrident: isItTrident
    };
}

