import {
  sources,
  loadSources
} from "@fps/fingerprintjs";

import { incognitoMode } from '../src/incognitoMode';
import { getNavigator } from "../src/oldFingerprint";

const listAttributeHash: string[] = ["canvas", "math", "webGlBasics", "webGlExtensions"];

interface componentObject {
  value: {};
  duration: number;
}

function componentsToJsonString(components: any, callback): string {
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
        value = JSON.stringify("string");
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


function applyHashToProperties(components: any, propertyNames: string[], hashFunction: any): any {
  if (typeof hashFunction == 'function') {
    for (const propertyName of propertyNames) {
      if (components.hasOwnProperty(propertyName) && components[propertyName] !== null) {
        const valueToHash = JSON.stringify(components[propertyName].value);
        components[propertyName].value = hashFunction(valueToHash);
      }
    }
  }

  return components;
}

function getIncognitoMode(): Promise<componentObject> {
  const start = Date.now();
  return incognitoMode().then((result) => {
    return Promise.resolve({ value: result, duration: Date.now() - start });
  });

}

(async function () {
  const fpPromise = loadSources(sources, {}, [])();

  return fpPromise.then((components: any) => {
    components = applyHashToProperties(components, ["canvas","webGlExtensions"], function(val){return "hashed";});
    return getIncognitoMode().then((mode) => {
      const customComponents = {
        ...components,
        isIncognitoMode: mode,
        navigator: getNavigator()
      };
      console.log('customComponents: ', customComponents.screenFrame);
    })
  });
})();