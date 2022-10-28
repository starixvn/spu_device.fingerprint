import FingerprintJS, {
  sources,
  loadSources,
  UnknownComponents,
  isWebKit,
  isDesktopSafari,
  isAndroid,
  isChromium,
  isGecko,
  isEdgeHTML,
  isTrident,
} from "@fingerprintjs/fingerprintjs";

import {
  isFnCanvasDefender,
  isFnWebGLDefender,
  isFnFontDefender,
  isFnAudioContextDefender,
} from "./addonDefenderDetection";
import { webglId } from "./webgl";

import { getCanvas } from "./canvas";
import { hashMD5 } from "./crypt";

interface fpResult {
  Id: string;
  Properties: {};
  ErrorValue: string;
  CheckCanvasDefender: boolean;
  CheckWebGLDefender: boolean;
  CheckFontDefender: boolean;
  CheckAudioContextDefender: boolean;
}
interface componentObject {
  value: {};
  duration: number;
}

	const listAttributeHash: string[] = ["math", "fontPreferencePrint"];																

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
  let result;

  if (!isFnWebGLDefender()) {
    result = webglId();
  }

  return { value: result, duration: Date.now() - start };
}

function getDoNotTrack(): componentObject {
  const start = Date.now();
  let result = navigator.doNotTrack;
  return { value: result, duration: Date.now() - start };
}

function getWebGLRenderer(webgl: componentObject): componentObject {
  const start = Date.now();
  if (webgl && webgl.value == 'unstable') {
    return { value: 'unstable', duration: Date.now() - start };
  }

  return { value: getGLRenderer(), duration: Date.now() - start };
}

function getGLRenderer(){
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  if (gl && typeof gl.getExtension === "function" && gl.getExtension("WEBGL_debug_renderer_info") != null) {
    return gl.getParameter(gl.getExtension("WEBGL_debug_renderer_info").UNMASKED_RENDERER_WEBGL);
  }
  return "";
}

function componentsToCanonicalString(components: UnknownComponents): {} {
  let result = "";
  for (const componentKey of Object.keys(components).sort()) {
    const component = components[componentKey];
    const value = component.error ? "error" : component.value;
    const duration = component.error
      ? "error"
      : JSON.stringify(component.duration);
    result += `${result ? "},{" : "{"}${`"${componentKey}"`.replace(
      /([:|\\])/g,
      "\\$1"
    )}:${
      value == undefined
        ? `"undefined"`
        : `${JSON.stringify(value)},"duration":${duration}`
    }`;
  }

  return `[${result}}]`;
}

function componentsToJsonString(components: UnknownComponents): string {
  let result = "";
  let err: string;
  for (const componentKey of Object.keys(components).sort()) {
    const component = components[componentKey];
    let value = component.error ? "error" : JSON.stringify(component.value == undefined ? `undefined` : component.value);

    if(listAttributeHash.indexOf(componentKey) > -1){
      value = JSON.stringify(hashMD5(value));
    }

    if (component.error) {
      err += `${componentKey}: ${component.error.message},`;
    }

    result += `${result ? "," : "{"}${`"${componentKey}"`.replace(
      /([:|\\])/g,
      "\\$1"
    )}:${value}`;
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

export function getAudio(): number | (() => Promise<number>) {
  return sources.audio();
}

export function getBrowserSupport(): {} {
  return {
    isWebKit: isWebKit,
    isDesktopSafari: isDesktopSafari,
    isAndroid: isAndroid,
    isChromium: isChromium,
    isGecko: isGecko,
    isTrident: isTrident,
  };
}

export function getFP(): Promise<fpResult> {
  let visitorId: string;

  const fpPromise = loadSources(sources, {}, [
    "screenResolution",
    "screenFrame",
    "canvas",
    "fontPreferences",
    "languages",
  ])();

  const canvas = getCanvas();
  const webgl = getWebGL();

  return fpPromise.then(async (components) => {
    const customComponents = {
      ...components,
      screenPrint: getScreenPrint(),
      fontPreferencePrint: await getFontPreference(),
      languagesPrint: getLanguages(),
      canvasPrint: canvas,
      webglPrint: webgl,
      webglRenderer: getWebGLRenderer(webgl),
      doNotTrack: getDoNotTrack(),
    };
    
    visitorId = FingerprintJS.hashComponents(customComponents);
    let properties = componentsToJsonString(customComponents);

    return Promise.resolve({
      Id: visitorId,
      Properties: properties,
      ErrorValue: "",
      CheckCanvasDefender: isFnCanvasDefender(),
      CheckWebGLDefender: isFnWebGLDefender(),
      CheckFontDefender: isFnFontDefender(),
      CheckAudioContextDefender: isFnAudioContextDefender(),
    });
  });
}
