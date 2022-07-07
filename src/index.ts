import { encryptingAsync } from "./crypt";
import { getFP } from "./fp";
import * as appConfig from "./appConfig";
import { storageHandler } from "./cookie";
import { getHeadlessScore } from "./headlessDetection";
import * as core from "./core";

var _isDebug: boolean = false;
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

  Promise.all([configs, cookies, fps, headless]).then(
    ([config, cookie, fp, hl]) => {
      if (config != null && config != "") {
        const cryptConfig = {
          iv: config.iv,
          pass: config.ek,
          salt: config.sa,
        };

        encryptingAsync(
          {
            di: fp.Id,
            attr: fp.Properties,
          },
          cryptConfig
        ).then((res) => {
          return core.postData(appConfig.apiUrl + "/fpa", res);
        });

        encryptingAsync(
          {
            di: fp.Id,
            fk: appConfig.sessionKey,
            subs: appConfig.subscriberId,
            cookieCode: cookie,
            flagged: JSON.stringify(hl),
            url:
              window.location && window.location.href
                ? window.location.href
                : "",
          },
          cryptConfig
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
