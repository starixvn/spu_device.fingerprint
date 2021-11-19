import { Encrypting } from "./crypt";
import { getDI } from "./fp";
import * as appConfig from "./appConfig";

var _isDebug: boolean = false;

export function isDebug(isDebug: boolean) {
  _isDebug = isDebug;
  return this;
}

export function config(apiUrl: string, token: string, subscriberId: number) {
  appConfig.set(apiUrl, token, subscriberId);
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

        if (sessionKeyValue != null && sessionKeyValue != "") {
          getConfig().then(async (res) => {
            if (res.ok) {
              let response = await res.json();
              let encryptedFP = Encrypting(
                {
                  di: result.Id,
                  attr: result.Properties,
                  fk: sessionKeyValue,
                  subs: appConfig.subscriberId,
                },
                response.encryptedKey
              );

              postData(encryptedFP, response.token);
            }
          });
        }
      } else {
        getConfig().then(async (res) => {
          if (res.ok) {
            let response = await res.json();
            let encryptedFP = Encrypting(
              {
                di: result.Id,
                attr: result.Properties,
                fk: response.sessionKey,
                subs: appConfig.subscriberId,
              },
              response.encryptedKey
            );
            postData(encryptedFP, response.token).then((res) => {
              if (res.ok) {
                injectSessionKey(response.sessionKey);
              }
            });
          }
        });
      }
    }
  });
}

async function postData(data: string, token: string): Promise<Response> {
  return fetch(appConfig.apiUrl, {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
}

function getConfig(): Promise<Response> {
  return fetch(appConfig.apiUrl + "/conf", {
    method: "GET",
    redirect: "follow",
  });
}

getFP();
