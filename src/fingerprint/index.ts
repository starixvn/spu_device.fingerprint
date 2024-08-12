import  {
  sources,
  loadSources,
  UnknownComponents,
  
} from "@fps/fingerprintjs";
import {incognitoMode} from '../incognitoMode';
import { getNavigator } from "../oldFingerprint";

interface fpResult {
  Properties: {};
}
interface componentObject {
  value: {};
  duration: number;
}

function getDoNotTrack(): componentObject {
  const start = Date.now();
  let result = navigator.doNotTrack;
  return { value: result, duration: Date.now() - start };
}

function getTimezoneOffset(): componentObject {
  const start = Date.now();
  const result = new Date().getTimezoneOffset().toString();
  return { value: result, duration: Date.now() - start };
}

function getIncognitoMode(): Promise<componentObject> {
  const start = Date.now();
  return incognitoMode().then((result) => {
    return Promise.resolve({ value: result, duration: Date.now() - start });
  });
  
}

function hashPropertyByFunction(components: any, propertyName: string, hashFunction: any): any {
  components[propertyName].value = hashFunction(components[propertyName].value);
  return components;
}

function componentsToJsonString(components: UnknownComponents): string {
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
      value = JSON.stringify(component.value);
    }

    const escapedComponentKey = `"${componentKey.replace(/([:|\\])/g, "\\$1")}"`;
    result += `${result ? "," : "{"}${escapedComponentKey}:${value}`;
  }

  return `${result}}`;
}

export function getResult(callback): Promise<fpResult> {
  const fpPromise = loadSources(sources, {}, [])();

  return fpPromise.then((components: { isIncognitoMode: componentObject }) => {
    components = hashPropertyByFunction(components, "canvas", callback);

    return getIncognitoMode().then((mode) => {
      components.isIncognitoMode = mode;

      const customComponents = {
        ...components,
        doNotTrack: getDoNotTrack(),
        navigator: getNavigator(),
        timezoneOffset: getTimezoneOffset()
      };

      let properties = componentsToJsonString(customComponents);
      
      return Promise.resolve({
        Properties: properties
      });
    })
  });
}
