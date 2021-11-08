import FingerprintJS, {
  sources,
  UnknownComponents,
} from "@fingerprintjs/fingerprintjs";

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

function componentsToCanonicalString(components: UnknownComponents): {} {
  let result = "";
  for (const componentKey of Object.keys(components).sort()) {
    const component = components[componentKey];
    const value = component.error ? "error" : JSON.stringify(component.value);

    result += `${result ? "," : ""}${componentKey.replace(
      /([:|\\])/g,
      "\\$1"
    )}:${value}`;
  }

  return "{" + result + "}";
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

export function getDI(): Promise<fpResult> {
  let visitorId: string;
  let properties: {};

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

      const customComponents = {
        ...components,
        screenPrint: { value: getScreenPrint(), duration: 0 },
        canvasPrint: { value: getCanvas(), duration: 0 },
        fontPreferencePrint: {
          value: await getFontPreference(),
          duration: 0,
        },
      };

      visitorId = FingerprintJS.hashComponents(customComponents);

      properties = componentsToCanonicalString(customComponents);

      return Promise.resolve({ Id: visitorId, Properties: properties });
    });
}
