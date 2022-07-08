import { EncryptingAsync } from "./crypt";
import { getFP } from "./fp";
import * as appConfig from "./appConfig";
import { storageHandler } from "./cookie";
import { getHeadlessScore } from "./headlessdetection";
import { getBrowserInfo } from "./browserDetect";
import * as core from "./core";

var _cookieName: string = "__fp";

export function config(
  apiUrl: string,
  subscriberId: string,
  sessionKey: string
) {
  appConfig.set(apiUrl, subscriberId, sessionKey);
}

export function index() {
  const configs = getConfig(appConfig.apiUrl, appConfig.sessionKey).then(
    (conf) => {
      return conf.json();
    }
  );
  const cookies = getCookie();
  const fps = getFP();
  const headless = getHeadlessScore();
  const browserInfo = getBrowserInfo();

  Promise.all([configs, cookies, fps, headless, browserInfo]).then(
    ([config, cookie, fp, hl, bi]) => {
      if (config != null && config != "") {
        EncryptingAsync(
          {
            di: fp.Id,
            attr: fp.Properties,
          },
          {
            iv: config.iv,
            pass: config.ek,
            salt: config.sa,
          }
        ).then((res) => {
          return core.postData(appConfig.apiUrl + "/fpa", res);
        });

        EncryptingAsync(
          {
            fk: appConfig.sessionKey,
            ua: navigator.userAgent,
            uad: JSON.stringify(navigator.userAgentData),
            hscore: JSON.stringify(hl),
            binfo: JSON.stringify(bi)
          },
          {
            iv: config.iv,
            pass: config.ek,
            salt: config.sa,
          }
        ).then((res) => {
          return core.postData(appConfig.apiUrl + "/bi", res);
        });

        EncryptingAsync(
          {
            di: fp.Id,
            fk: appConfig.sessionKey,
            subs: appConfig.subscriberId,
            cookieCode: cookie,
            url:
              window.location && window.location.href
                ? window.location.href
                : "",
          },
          {
            iv: config.iv,
            pass: config.ek,
            salt: config.sa,
          }
        ).then((res) => {
          return core.postDataFp(appConfig.apiUrl, res, config.tk);
        });
      }
    }
  );
}

function getCookie() {
  return storageHandler(_cookieName);
}

function getConfig(url: string, sessionKey: string): Promise<Response> {
  return fetch(url + "/conf/" + sessionKey, {
    method: "GET",
    redirect: "follow",
  });
}

index();
