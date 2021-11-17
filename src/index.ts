import { Encrypting } from "./crypt";
import { getDI } from "./fp";
import * as appConfig from "./appConfig";

var _isDebug: boolean = false;

export function isDebug(isDebug: boolean) {
  _isDebug = isDebug;
  return this;
}

export function config(
  key: string,
  apiUrl: string,
  token: string,
  fpsKey: string,
  subscriberId: number
) {
  appConfig.set(key, apiUrl, token, fpsKey, subscriberId);
}

function injectSessionKey(value: string) {
  var container = document.forms[0] || document.body;
  var fkInput = document.createElement("input");
  fkInput.setAttribute("type", "hidden");
  fkInput.setAttribute("name", "__fk");
  fkInput.setAttribute("id", "__fk");
  fkInput.setAttribute("value", value);

  container.appendChild(fkInput);
}

function getFP() {
  getDI().then((result) => {
    if (_isDebug) {
      console.log(result.Id);
      console.log(result.Properties);
    } else {
      let sessionKeyElement = document.getElementById("__fk");

      if (sessionKeyElement) {
        let sessionKeyValue = (sessionKeyElement as HTMLInputElement).value;
        let encryptedFP = Encrypting(
          {
            di: result.Id,
            fk: sessionKeyValue,
            attr: result.Properties,
            subs: appConfig.subscriberId,
          },
          appConfig.key
        );

        postData(encryptedFP);
      } else {
        let encryptedFP = Encrypting(
          {
            di: result.Id,
            fk: appConfig.fpsKey,
            attr: result.Properties,
            subs: appConfig.subscriberId,
          },
          appConfig.key
        );

        postData(encryptedFP).then((res) => {
          if (res.ok) {
            injectSessionKey(appConfig.fpsKey);
          }
        });
      }
    }
  });
}

async function postData(data: string): Promise<Response> {
  return fetch(appConfig.apiUrl, {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + appConfig.token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
}

getFP();
