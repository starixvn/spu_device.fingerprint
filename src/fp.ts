import FingerprintJS, {
  sources,
  loadSources,
  UnknownComponents,
} from "@fingerprintjs/fingerprintjs";
import { checkFnCanvasDefender, checkFnWebGLDefender } from "./detectAddonDefender";
import webglId from "./webgl";

interface fpResult {
  Id: string;
  Properties: {};
}
interface CanvasFingerprint {
  winding: boolean;
  geometry: string;
  text: string;
}
interface componentObjectCanvas {
  value: CanvasFingerprint;
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

async function getCanvas(): Promise<componentObjectCanvas> {
  const start = Date.now();

  let canvas = sources.canvas();
  const result = {
    winding: canvas.winding,
    geometry: canvas.geometry,
    text: "",
  };
  return { value: result, duration: Date.now() - start };
}

function componentsToCanonicalString(components: UnknownComponents): {} {
  let result = "";
  for (const componentKey of Object.keys(components).sort()) {
    const component = components[componentKey];
    const value = component.error ? "error" : JSON.stringify(component.value);

    const duration = component.error ? "error" : JSON.stringify(component.duration);
    result += `${result ? "},{" : "{"}${`"${componentKey}"`.replace(
      /([:|\\])/g,
      "\\$1"
    )}:${value == undefined ? `"undefined"` : `${value},"duration":${duration}`}`;
  }

  return `[${result}}]`;
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

  return fpPromise.then(async (components) => {
    const customComponents = {
      ...components,
      screenPrint: getScreenPrint(),
      fontPreferencePrint: await getFontPreference(),
      languagesPrint: getLanguages()
    };

    const checkCanvasDefender = await checkFnCanvasDefender();
    const checkWebGLDefender = await checkFnWebGLDefender();
    
    if(!checkCanvasDefender){
      customComponents['canvasPrint'] = await getCanvas();
    }
    else if(!checkWebGLDefender){
      customComponents['webglId'] = webglId();
    }

    visitorId = FingerprintJS.hashComponents(customComponents);
    properties = componentsToCanonicalString(customComponents);

    return Promise.resolve({ 
      Id: visitorId, 
      Properties: properties, 
      CheckCanvasDefender: checkCanvasDefender, 
      CheckWebGLDefender: checkWebGLDefender
    });
  });
}
