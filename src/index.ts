import { Encrypting, HashMD5 } from "./crypt";
import { getDI } from "./fp";
import * as appConfig from "./appConfig";
import { getDeviceInfo } from "./userAgent";

var _isDebug: boolean = false;
var _hiddenName: string = "__sk";

export function isDebug(isDebug: boolean) {
  _isDebug = isDebug;
  return this;
}

export function config(apiUrl: string, subscriberId: number) {
  appConfig.set(apiUrl, subscriberId);
}

const promiseAny = async <T>(
  iterable: Iterable<T | PromiseLike<T>>
): Promise<T> => {
  return Promise.all(
    [...iterable].map((promise) => {
      return new Promise((resolve, reject) =>
        Promise.resolve(promise).then(reject, resolve)
      );
    })
  ).then(
    (errors) => Promise.reject(errors),
    (value) => Promise.resolve<T>(value)
  );
};

function injectSessionKey(value: string) {
  var container = document.forms[0] || document.body;
  var fkInput = document.createElement("input");
  fkInput.setAttribute("type", "hidden");
  fkInput.setAttribute("name", _hiddenName);
  fkInput.setAttribute("id", _hiddenName);
  fkInput.setAttribute("value", value);

  container.appendChild(fkInput);
}

function getFP() {
  let start = Date.now();

  getDI().then((result) => {
    if (_isDebug) {
      console.log(result.Id);
      console.log(result.Properties);
    } else {
      let sessionKeyElement = document.getElementById(_hiddenName);

      if (sessionKeyElement) {
        let sessionKeyValue = (sessionKeyElement as HTMLInputElement).value;

        if (sessionKeyValue != null && sessionKeyValue != "") {
          processData(result, false, sessionKeyValue);
        }
      } else {
        processData(result, true, null);
      }
    }
  });

  let end = Date.now() - start;
  console.log(`milliseconds elapsed of collect fp = ${end}`);
}

function processData(result, isInject: boolean, sessionKey: string) {
  getDomain()
    .then((res) => res.text())
    .then((req) => {
      var requests = JSON.parse(req).map(function (url) {
        return fetch(url + "/api/fp/hc", {
          cache: "no-cache",
        });
      });

      promiseAny(requests).then((res: Response) => {
        if (res.status == 200) {
          var str = res.url;
          var index = str.lastIndexOf("/");
          var url = str.substring(0, index);

          getConfig(url).then(async (conf) => {
            if (conf.ok) {
              const response = await conf.json();
              const deviceInfo = getDeviceInfo();
              const device = JSON.stringify(deviceInfo);
              let encryptedFP = Encrypting(
                {
                  di: result.Id,
                  attr: result.Properties,
                  fk: isInject ? response.c : sessionKey,
                  subs: appConfig.subscriberId,
                  dev: device,
                  devCode: HashMD5(device),
                },
                response.a
              );
              postData(url, encryptedFP, response.b).then((data) => {
                if (data.ok && isInject) {
                  injectSessionKey(response.c);
                }
              });
            }
          });
        }
      });
    });
}

async function postData(
  url: string,
  data: string,
  token: string
): Promise<Response> {
  return fetch(url, {
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

function getConfig(url: string): Promise<Response> {
  return fetch(url + "/conf", {
    method: "GET",
    redirect: "follow",
  });
}

function getDomain(): Promise<Response> {
  return fetch(appConfig.apiUrl + "/subscriber/" + appConfig.subscriberId, {
    method: "GET",
    redirect: "follow",
  });
}

getFP();
