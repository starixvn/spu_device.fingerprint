import { Encrypting } from "./crypt";
import { getDI } from "./fp";
import * as appConfig from "./appConfig";
import { fips } from "crypto";

var _isDebug: boolean = false;

export function isDebug(isDebug: boolean) {
  _isDebug = isDebug;
  return this;
}

export function config(
  key: string,
  apiUrl: string,
  token: string,
  fpsKey: string
) {
  appConfig.set(key, apiUrl, token, fpsKey);
}

function getFP() {
  getDI().then((result) => {
    if (_isDebug) {
      console.log(result.Id);
      console.log(result.Properties);
    } else {
      postData(
        Encrypting(
          {
            di: result.Id,
            fk: appConfig.fpsKey,
            attr: result.Properties,
          },
          appConfig.key
        )
      ).then((res) => {
        if (res.ok) {
          var container = document.forms[0] || document.body;
          var fkInput = document.createElement("input");
          fkInput.setAttribute("type", "hidden");
          fkInput.setAttribute("name", "__fk");
          fkInput.setAttribute("id", "__fk");
          fkInput.setAttribute("value", appConfig.fpsKey);

          container.appendChild(fkInput);
        }
      });
    }
  });
}

async function postData(data: string): Promise<Response> {
  // Default options are marked with *
  return fetch(appConfig.apiUrl, {
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
