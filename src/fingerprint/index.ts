import  {
  sources,
  loadSources,
  UnknownComponents,
  
} from "@fps/fingerprintjs";
import { webglId } from "./webgl";
import {detectIncognito} from '../incognitoDetection/index'

interface fpResult {
  Properties: {};
}
interface componentObject {
  value: {};
  duration: number;
}

const listAttributeHash: string[] = ["canvas", "math", "webGlBasics", "webGlExtensions"];

function getWebGL(callback): componentObject {
  const start: Date = new Date();
  const result = webglId(callback);

  return { value: result, duration: (new Date()).getMilliseconds() - start.getMilliseconds() };
}

function getDoNotTrack(): componentObject {
  const start = Date.now();
  let result = navigator.doNotTrack;
  return { value: result, duration: Date.now() - start };
}

function componentsToJsonString(components: UnknownComponents, callback): string {
  const sortedKeys = Object.keys(components).sort();
  let result = "";
  let err = "";
  for (const componentKey of sortedKeys) {
    const component = components[componentKey];
    let value: string;

    if ("error" in component) {
      value = `"error"`;
      err += `${componentKey}: "${component.error}",`;
    } else if (component.value === undefined) {
      value = `"undefined"`;
    } else {
      if (listAttributeHash.includes(componentKey)) {
        value = JSON.stringify(callback(JSON.stringify(component.value)));
      }
      else {
        value = JSON.stringify(component.value);
      }
    }

    const escapedComponentKey = `"${componentKey.replace(/([:|\\])/g, "\\$1")}"`;
    result += `${result ? "," : "{"}${escapedComponentKey}:${value}`;
  }

  return `${result}}`;
}

function getIncognitoMode(param) {
  return detectIncognito().then((result) => {
    return {
      components: param,
        incognitoMode: result
    };
  });
}

export function getResult(callback): Promise<fpResult> {
  const fpPromise = loadSources(sources, {}, [])();

  return fpPromise.then(async (result) => getIncognitoMode(result))
  .then((res) => {
    const customComponents = {
      ...res.components,
      doNotTrack: getDoNotTrack(),
      isIncognitoMode: { value: res.incognitoMode },
    };

    let properties = componentsToJsonString(customComponents, callback);
    
    console.log('properties', properties);

    return Promise.resolve({
      Properties: properties
    });
  });
}
