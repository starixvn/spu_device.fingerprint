import FingerprintJS, {
  sources,
  UnknownComponents,
} from "@fingerprintjs/fingerprintjs";

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

function getScreenPrint(): {} {
  return {
    currentResolution: getCurrentResolution(),
    pixelDepth: getPixelDepth(),
  };
}

function getCanvas(): CanvasFingerprint {
  let canvas = sources.canvas();

  return {
    winding: canvas.winding,
    geometry: canvas.geometry,
    text: "",
  };
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

async function getFontPreference(): Promise<Record<string, number>> {
  let font = await sources.fontPreferences();
  return {
    default: font["default"],
    apple: font["apple"],
    serif: font["serif"],
    sans: font["sans"],
    min: font["min"],
    system: font["system"],
  };
}

function getLanguages(): {} {
  return {
    language: window.navigator.language,
    languages: window.navigator.languages.join(","),
    userLanguage: window.navigator["userLanguage"],
    browserLanguage: window.navigator["browserLanguage"],
    systemLanguage: window.navigator["systemLanguage"],
  };
}

export function getFP(): Promise<fpResult> {
  let visitorId: string;
  let properties: {};

  const fpPromise = FingerprintJS.load({
    monitoring: false,
  });

  return fpPromise
    .then((fp) => fp.get())
    .then(async (result) => {
      const {
        screenResolution,
        screenFrame,
        canvas,
        fontPreferences,
        languages,
        ...components
      } = result.components;

      const customComponents = {
        ...components,
        screenPrint: { value: getScreenPrint(), duration: 0 },
        canvasPrint: { value: getCanvas(), duration: 0 },
        fontPreferencePrint: {
          value: await getFontPreference(),
          duration: 0,
        },
        languagesPrint: {
          value: getLanguages(),
          duration: 0,
        },
      };

      visitorId = FingerprintJS.hashComponents(customComponents);

      properties = componentsToCanonicalString(customComponents);

      return Promise.resolve({ Id: visitorId, Properties: properties });
    });
}
