import FingerprintJS, {
  sources,
  loadSources,
  UnknownComponents,
} from "@fingerprintjs/fingerprintjs";
import {
  isFnCanvasDefender,
  isFnWebGLDefender,
  isFnFontDefender,
  isFnAudioContextDefender,
} from "./addonDefenderDetection";
import webglId from "./webgl";

interface fpResult {
  Id: string;
  Properties: {};
  CheckCanvasDefender: boolean;
  CheckWebGLDefender: boolean;
  CheckFontDefender: boolean;
  CheckAudioContextDefender: boolean;
}
interface canvasFingerprint {
  winding: boolean;
  geometry: string;
  text: string;
}
interface componentObjectCanvas {
  value: canvasFingerprint;
  duration: number;
}
interface componentObject {
  value: {};
  duration: number;
}

const enum InnerErrorName {
  Timeout = 'timeout',
  Suspended = 'suspended',
}

const enum SpecialFingerprint {
  KnownToSuspend = -1,
  NotSupported = -2,
  Timeout = -3,
}

function getDevicePixelRatio(): number {
  return window.devicePixelRatio;
}

function getCurrentResolution(): string {
  let ratio = getDevicePixelRatio();
  return screen.width * ratio + "x" + screen.height * ratio;
}

function getPixelDepth(): number {
  return screen.pixelDepth;
}

function getScreenPrint(): componentObject {
  const start = Date.now();

  const result = {
    currentResolution: getCurrentResolution(),
    pixelDepth: getPixelDepth(),
  };

  return { value: result, duration: Date.now() - start };
}

function getCanvas(): componentObjectCanvas {
  const start = Date.now();

  if (!isFnCanvasDefender()) {
    let result = getCanvasFingerprint();
    if(result.geometry != ""){
      return { value: result, duration: Date.now() - start };
    }
  }

  return { value: undefined, duration: Date.now() - start };
}

function getCanvasFingerprint(): canvasFingerprint {
  var _a = makeCanvasContext(), canvas = _a[0], context = _a[1];
  if (!isSupported(canvas, context)) {
      return { winding: false, geometry: '', text: '' };
  }
  return {
      winding: doesSupportWinding(context),
      geometry: makeGeometryImage(canvas, context),
      text: "",
  };
}

function makeCanvasContext(): (HTMLCanvasElement | CanvasRenderingContext2D)[] {
  var canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return [canvas, canvas.getContext('2d')];
}

function isSupported(canvas, context): boolean {
  return !!(context && canvas.toDataURL);
}

function doesSupportWinding(context): boolean {
  context.rect(0, 0, 10, 10);
  context.rect(2, 2, 6, 6);
  return !context.isPointInPath(5, 5, 'evenodd');
}

function makeGeometryImage(canvas, context): string {
  canvas.width = 122;
  canvas.height = 110;
  // Canvas blending
  context.globalCompositeOperation = 'multiply';
  for (var _i = 0, _a = [
      ['#f2f', 40, 40],
      ['#2ff', 80, 40],
      ['#ff2', 60, 80],
  ]; _i < _a.length; _i++) {
      var _b = _a[_i], color = _b[0], x = _b[1], y = _b[2];
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, 40, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
  }
  // Canvas winding
  context.fillStyle = '#f9c';
  context.arc(60, 60, 60, 0, Math.PI * 2, true);
  context.arc(60, 60, 20, 0, Math.PI * 2, true);
  context.fill('evenodd');
  return save(canvas);
}

function save(canvas): string {
  var url1 = canvas.toDataURL();
  var url2 = canvas.toDataURL();
  return url1 == url2 ? url1 : "";
}


function getAudioFingerprint(): () => Promise<unknown> {
  var w = window;
  var AudioContext = w["OfflineAudioContext"] || w["webkitOfflineAudioContext"];
  if (!AudioContext) {
    return () => new Promise((resolve) => {
      resolve(SpecialFingerprint.NotSupported);
    });
  }
  if (doesCurrentBrowserSuspendAudioContext()) {
    return () => new Promise((resolve) => {
      resolve(SpecialFingerprint.KnownToSuspend);
    });
  }
  var hashFromIndex = 4500;
  var hashToIndex = 5000;
  var context = new AudioContext(1, hashToIndex, 44100);
  var oscillator = context.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.value = 10000;
  var compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;
  oscillator.connect(compressor);
  compressor.connect(context.destination);
  oscillator.start(0);

  const [renderPromise, finishRendering] = startRenderingAudio(context);
  const fingerprintPromise = renderPromise.then(
      (buffer) => getHash(buffer.getChannelData(0).subarray(hashFromIndex)),
      (error) => {
        if (error.name === InnerErrorName.Timeout || error.name === InnerErrorName.Suspended) {
          return SpecialFingerprint.Timeout;
        }
        throw error
      },
    );

  // Suppresses the console error message in case when the fingerprint fails before requested
  fingerprintPromise.catch(function () { return undefined; });
  return function () {
      finishRendering();
      return fingerprintPromise;
  };
}

function doesCurrentBrowserSuspendAudioContext() {
  return isWebKit() && !isDesktopSafari() && !isWebKit606OrNewer();
}

function isWebKit(): boolean {
  // Based on research in September 2020
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

function countTruthy(values): any {
  return values.reduce(function (sum, value) { return sum + (value ? 1 : 0); }, 0);
}

function startRenderingAudio(context: OfflineAudioContext) {
  const renderTryMaxCount = 3
  const renderRetryDelay = 500
  const runningMaxAwaitTime = 500
  const runningSufficientTime = 5000
  let finalize = () => undefined as void

  const resultPromise = new Promise<AudioBuffer>((resolve, reject) => {
    let isFinalized = false
    let renderTryCount = 0
    let startedRunningAt = 0

    context.oncomplete = (event) => resolve(event.renderedBuffer)

    const startRunningTimeout = () => {
      setTimeout(
        () => reject(makeInnerError(InnerErrorName.Timeout)),
        Math.min(runningMaxAwaitTime, startedRunningAt + runningSufficientTime - Date.now()),
      )
    }

    const tryRender = () => {
      try {
        context.startRendering()

        switch (context.state) {
          case 'running':
            startedRunningAt = Date.now()
            if (isFinalized) {
              startRunningTimeout()
            }
            break

          case 'suspended':
            if (!document.hidden) {
              renderTryCount++
            }
            if (isFinalized && renderTryCount >= renderTryMaxCount) {
              reject(makeInnerError(InnerErrorName.Suspended))
            } else {
              setTimeout(tryRender, renderRetryDelay)
            }
            break
        }
      } catch (error) {
        reject(error)
      }
    }

    tryRender()

    finalize = () => {
      if (!isFinalized) {
        isFinalized = true
        if (startedRunningAt > 0) {
          startRunningTimeout()
        }
      }
    }
  })

  return [resultPromise, finalize] as const
}

function getHash(signal: ArrayLike<number>): number {
  let hash = 0
  for (let i = 0; i < signal.length; ++i) {
    hash += Math.abs(signal[i])
  }
  return hash
}

function makeInnerError(name: InnerErrorName) {
  const error = new Error(name)
  error.name = name
  return error
}

function isDesktopSafari() {
  var w = window;
  return (countTruthy([
      'safari' in w,
      !('DeviceMotionEvent' in w),
      !('ongestureend' in w),
      !('standalone' in navigator),
  ]) >= 3);
}

function isWebKit606OrNewer() {
  // Checked in Safari 9–14
  var w = window;
  return (countTruthy([
      'DOMRectList' in w,
      'RTCPeerConnectionIceEvent' in w,
      'SVGGeometryElement' in w,
      'ontransitioncancel' in w,
  ]) >= 3);
}

function getWebGL(): componentObject {
  const start = Date.now();
  let result = "undefined";

  if (!isFnWebGLDefender()) {
    result = webglId();
  }

  return { value: result, duration: Date.now() - start };
}

function getDoNotTrack() {
  const start = Date.now();
  let result = navigator.doNotTrack;
  return { value: result, duration: Date.now() - start };
}

function getWebGLRenderer() {
  const start = Date.now();
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  let result = "";
  if (gl && typeof gl.getExtension === "function" && gl.getExtension("WEBGL_debug_renderer_info") != null) {
    result = gl.getParameter(gl.getExtension("WEBGL_debug_renderer_info").UNMASKED_RENDERER_WEBGL);
  }
  return { value: result, duration: Date.now() - start };
}

function componentsToCanonicalString(components: UnknownComponents): {} {
  let result = "";
  for (const componentKey of Object.keys(components).sort()) {
    const component = components[componentKey];
    const value = component.error ? "error" : JSON.stringify(component.value);
    const duration = component.error
      ? "error"
      : JSON.stringify(component.duration);
    result += `${result ? "},{" : "{"}${`"${componentKey}"`.replace(
      /([:|\\])/g,
      "\\$1"
    )}:${
      value == undefined ? `"undefined"` : `${value},"duration":${duration}`
    }`;
  }

  return `[${result}}]`;
}

function componentsToJsonString(components: UnknownComponents): {} {
  let result = "";
  for (const componentKey of Object.keys(components).sort()) {
    const component = components[componentKey];
    const value = component.error ? "error" : JSON.stringify(component.value);
    
    result += `${result ? "," : "{"}${`"${componentKey}"`.replace(
      /([:|\\])/g,
      "\\$1"
    )}:${
      value == undefined ? `"undefined"` : `${value}`
    }`;
  }

  return `${result}}`;
}

async function getFontPreference(): Promise<componentObject> {
  const start = Date.now();

  const font = await sources.fontPreferences();
  const result = {
    default: font["default"],
    apple: font["apple"],
    serif: font["serif"],
    sans: font["sans"],
    min: font["min"],
    system: font["system"],
  };
  return { value: result, duration: Date.now() - start };
}

function getLanguages(): componentObject {
  const start = Date.now();
  const result = {
    language: window.navigator.language,
    languages: window.navigator.languages.join(","),
    userLanguage: window.navigator["userLanguage"],
    browserLanguage: window.navigator["browserLanguage"],
    systemLanguage: window.navigator["systemLanguage"],
  };
  return { value: result, duration: Date.now() - start };
}

function getPromise(): Promise<unknown>{
  const promise = new Promise((resolve) => {
    resolve(333);
  });
  return promise;
}

export function getFP(): Promise<fpResult> {
  let visitorId: string;
  let properties: {};

  const fpPromise = loadSources(sources, {}, [
    "screenResolution",
    "screenFrame",
    "canvas",
    "fontPreferences",
    "languages",
    "audio"
  ])();

  const canvas = getCanvas();
  const audio = getAudioFingerprint();

  return fpPromise.then(async (components) => {
    const customComponents = {
      ...components,
      screenPrint: getScreenPrint(),
      fontPreferencePrint: await getFontPreference(),
      languagesPrint: getLanguages(),
      canvasPrint: canvas,
      doNotTrack: getDoNotTrack(),
      webglRenderer: getWebGLRenderer(),
      audio: {
          value: typeof audio == 'function' ? await audio().then((res)=>{return res;}) : undefined,
          duration: 0
      }
    };

    if(canvas && canvas.value == undefined){
      customComponents["webglPrint"] = getWebGL();
    }

    console.log('customComponents', customComponents);
    visitorId = FingerprintJS.hashComponents(customComponents);
    properties = componentsToJsonString(customComponents);

    return Promise.resolve({
      Id: visitorId,
      Properties: properties,
      CheckCanvasDefender: isFnCanvasDefender(),
      CheckWebGLDefender: isFnWebGLDefender(),
      CheckFontDefender: isFnFontDefender(),
      CheckAudioContextDefender: isFnAudioContextDefender(),
    });
  });
}
