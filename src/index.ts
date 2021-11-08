import { Encrypting } from "./crypt";
import { getDI } from "./fp";
import * as appConfig from "./appConfig";

var _isDebug: boolean = false;

export function isDebug(isDebug: boolean) {
  _isDebug = isDebug;
  return this;
}

export function config(key: string, apiUrl: string, token: string) {
  appConfig.set(key, apiUrl, token);
}

function getFP() {
  getDI().then((result) => {
    if (_isDebug) {
      console.log(result.Id);
      console.log(result.Properties);
    } else {
      appConfig.getKey();

      postData(
        Encrypting(
          {
            di: result.Id,
            fk: appConfig.fpsKey,
            attr: result.Properties,
          },
          appConfig.key
        )
      );
    }
  });
}

async function postData(data: string) {
  // Default options are marked with *
  fetch(appConfig.apiUrl, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + appConfig.token,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
}

getFP();
