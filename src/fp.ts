import FingerprintJS, {
  sources,
  loadSources,
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

function getPixelDepth(): number {
  return screen.pixelDepth;
}

function getScreenPrint(): {} {
  return {
    currentResolution: getCurrentResolution(),
    pixelDepth: getPixelDepth(),
  };
}

async function getCanvas(): Promise<CanvasFingerprint> {
  var _a = makeCanvasContext(), canvas = _a[0], context = _a[1];

  if (!isSupported(canvas, context)) {
    return { winding: false, geometry: "", text: "" };
  }
  return {
      winding: doesSupportWinding(context),
      geometry: await makeGeometryImage(canvas, context),
      text: ""
  };
}
function makeCanvasContext() {
  var canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return [canvas, canvas.getContext('2d')];
}

function isSupported(canvas, context) {
// const xfunction = cloneFunction(canvas.toDataURL);
// return !!(context && xfunction);
return !!(context && canvas.toDataURL);
}

function doesSupportWinding(context) {
  context.rect(0, 0, 10, 10);
  context.rect(2, 2, 6, 6);
  return !context.isPointInPath(5, 5, 'evenodd');
}

async function makeGeometryImage(canvas, context) : Promise<string> {
  canvas.width = 122;
  canvas.height = 110;
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
  
  context.fillStyle = '#f9c';
  context.arc(60, 60, 60, 0, Math.PI * 2, true);
  context.arc(60, 60, 20, 0, Math.PI * 2, true);
  context.fill('evenodd');
  return save(canvas);
}

async function save(canvas) : Promise<string> {
  return canvas.toDataURL("image/jpg");
  // return canvas.toDataURL();
  // const arrayToBuffer = canvasToArrayBuffer(canvas, 'image/png');
  // const result = await arrayToBuffer.then(async (data) => {
  //   return await arrayBufferToBase64(data);
  // });
  // return result;
}

async function canvasToArrayBuffer(canvas: HTMLCanvasElement, mime: string): Promise<ArrayBuffer> {
  return await new Promise((resolve, reject) => canvas.toBlob(async (d) => {
    if (d) {
      const r = new FileReader();
      r.addEventListener('loadend', e => {
        const ab = r.result;
        if (ab) {
          resolve(ab as ArrayBuffer);
        }
        else {
          reject(new Error('Expected FileReader result'));
        }
      }); r.addEventListener('error', e => {
        reject(e)
      });
      r.readAsArrayBuffer(d);
    }
    else {
      reject(new Error('Expected toBlob() to be defined'));
    }
  }, mime));
}

function arrayBufferToBase64(buffer) : string {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
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

  const fpPromise = loadSources(sources, {}, ["screenResolution", "screenFrame", "canvas", "fontPreferences", "languages"])();

  return fpPromise
    .then(async (components) => {

      const customComponents = {
        ...components,
        screenPrint: { value: getScreenPrint(), duration: 0 },
        canvasPrint: { value: await getCanvas(), duration: 0 },
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
