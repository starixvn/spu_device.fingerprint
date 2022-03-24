import { Encrypting, HashMD5 } from "./crypt";
import { getDI } from "./fp";
import * as appConfig from "./appConfig";
import { getDeviceInfo, checkHeadless } from "./userAgent";
import { storageHandler } from "./cookie";

var _isDebug: boolean = false;
var _cookieName: string = "__fp";

export function isDebug(isDebug: boolean) {
  _isDebug = isDebug;
  return this;
}

export function config(
  apiUrl: string,
  subscriberId: string,
  sessionKey: string
) {
  appConfig.set(apiUrl, subscriberId, sessionKey);
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

function getFP() {
  let start = Date.now();

  storageHandler(_cookieName).then((cookieCode) => {
    getDI()
      .then((result) => {
        if (_isDebug) {
          console.log(result.Id);
          console.log(result.Properties);
        } else {
          processData(result, appConfig.sessionKey, cookieCode);
        }
      })
      .then(() => {
        let end = Date.now() - start;
        console.log(`milliseconds elapsed of collect fp = ${end}ms`);
      });
  });
}

function processData(result, sessionKey: string, cookieCode: string) {
  getConfig(appConfig.apiUrl).then(async (conf) => {
    if (conf.ok) {
      const response = await conf.json();
      const deviceInfo = getDeviceInfo();
      const flagged = checkHeadless();
      const device = JSON.stringify(deviceInfo);
      let encryptedFP = Encrypting(
        {
          di: result.Id,
          attr: result.Properties,
          fk: sessionKey,
          subs: appConfig.subscriberId,
          ua: device,
          uaCode: HashMD5(device),
          cookieCode: cookieCode,
          flagged: flagged,
          url: window.location && window.location.href ? `${window.location.href}/` : ''
        },
        response.a
      );
      postData(appConfig.apiUrl, encryptedFP, response.b);
    }
  });
}

async function postData(
  url: string,
  data: string,
  token: string
): Promise<Response> {
  return fetch(url + "/fp", {
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
