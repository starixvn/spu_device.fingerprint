import {
    sources,
    loadSources
} from "@fps/fingerprintjs";

const listAttributeHash: string[] = ["canvas", "math", "webGlBasics", "webGlExtensions"];

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
  
(async function () {
    const fpPromise = loadSources(sources, {}, [])();

    fpPromise.then(async (components) => {
        let properties = componentsToJsonString(components, () => {});
        console.log('properties', properties);
    });
})();