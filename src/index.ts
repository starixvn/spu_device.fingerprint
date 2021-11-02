import { Encrypting } from "./crypt";
import { getDI } from "./fp";
import * as appConfig from "./appConfig";

export function config(key: string, apiUrl: string, token: string) {
  appConfig.set(key, apiUrl, token);

  return this;
}

export function getFP(isDebug: boolean = false) {
  return getDI().then((result) => {
    if (isDebug) {
      console.log(result.Id);
      console.log(result.Properties);
    } else {
      const data = Encrypting(
        JSON.stringify({ di: result.Id, attributes: result.Properties }),
        appConfig.key
      );
      console.log(data);
      post(appConfig.apiUrl, appConfig.token, data);
    }
  });
}

function post(url: string, token: string, data: string) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
}
