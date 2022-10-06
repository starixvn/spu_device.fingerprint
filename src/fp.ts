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

import { getCanvas } from "./canvas";

interface fpResult {
  Id: string;
  Properties: {};
  CheckCanvasDefender: boolean;
  CheckWebGLDefender: boolean;
  CheckFontDefender: boolean;
  CheckAudioContextDefender: boolean;
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
    "languages"
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
