import FingerprintJS, {
  Component,
  isGecko,
  isWebKit,
  isTrident,
  isChromium,
  isEdgeHTML,
} from "@fingerprintjs/fingerprintjs";

export interface fpResult {
  Id: string;
  Properties: string;
}

export interface ScreenData {
  Name: string;
  Resolution: [number | null, number | null];
  PixelDepth: number;
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

function getScreenPrint(): Component<Record<string, string>> {
  return {
    value: {
      currentResolution: getCurrentResolution(),
      pixelDepth: getPixelDepth(),
    },
    duration: 0,
  };
}

export function getGFPId(): Promise<fpResult> {
  let visitorId: string;
  let properties: string;

  const fpPromise = FingerprintJS.load();

  return fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      const { screenResolution, screenFrame, ...components } =
        result.components;
      const extendedComponents = {
        ...components,
        screenPrint: getScreenPrint(),
      };

      visitorId = FingerprintJS.hashComponents(extendedComponents);
      properties = FingerprintJS.componentsToDebugString(extendedComponents);

      return Promise.resolve({ Id: visitorId, Properties: properties });
    });
}
