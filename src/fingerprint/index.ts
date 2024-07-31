import  {
  sources,
  loadSources,
  UnknownComponents,
  
} from "@fps/fingerprintjs";
import { webglId } from "./webgl";

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









export function getResult(callback): Promise<fpResult> {
  const fpPromise = loadSources(sources, {}, [])();

  const webgl = getWebGL(function(){});

  return fpPromise.then(async (components) => {
    const customComponents = {
      ...components,
      doNotTrack: getDoNotTrack(),
    };

    let properties = componentsToJsonString(customComponents, callback);
    
    console.log('properties', properties);

    return Promise.resolve({
      Properties: properties
    });
  });
}
