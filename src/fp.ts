import FingerprintJS, { sources } from "@fingerprintjs/fingerprintjs";

interface fpResult {
  Id: string;
  Properties: string;
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

function getPixelDepth(): string {
  return screen.pixelDepth.toString();
}

function getScreenPrint(): Record<string, string> {
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

export function getGFPId(): Promise<fpResult> {
  let visitorId: string;
  let properties: string;

  const fpPromise = FingerprintJS.load();

  return fpPromise
    .then((fp) => fp.get())
    .then(async (result) => {
      const {
        screenResolution,
        screenFrame,
        canvas,
        fontPreferences,
        ...components
      } = result.components;

      const extendedComponents = {
        ...components,
        screenPrint: { value: getScreenPrint(), duration: 0 },
        canvasPrint: { value: getCanvas(), duration: 0 },
        fontPreferencePrint: {
          value: await getFontPreference(),
          duration: 0,
        },
      };

      visitorId = FingerprintJS.hashComponents(extendedComponents);
      properties = FingerprintJS.componentsToDebugString(extendedComponents);

      return Promise.resolve({ Id: visitorId, Properties: properties });
    });
}
