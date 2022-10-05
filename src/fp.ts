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

export function getFP(): Promise<fpResult> {
  let visitorId: string;
  let properties: {};

  const fpPromise = loadSources(sources, {}, [
    "screenResolution",
    "screenFrame",
    "canvas",
    "fontPreferences",
    "languages",
  ])();

  const canvas = getCanvas();

  return fpPromise.then(async (components) => {
    const customComponents = {
      ...components,
      screenPrint: getScreenPrint(),
      fontPreferencePrint: await getFontPreference(),
      languagesPrint: getLanguages(),
      canvasPrint: canvas,
      doNotTrack: getDoNotTrack(),
      webglRenderer: getWebGLRenderer()
    };

    if(canvas && canvas.value == undefined){
      customComponents["webglPrint"] = getWebGL();
    }

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
