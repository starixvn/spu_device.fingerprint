import { encryptingAsync } from "./crypt";
import * as fp from "./fp";
import { getHeadlessScore } from "./headlessDetection";
import { getBrowserInfo } from "./browserDetect";
import * as core from "./core";

export var apiUrl: string = "__apiUrl__";
export var subscriberId: string = "__subscriberId__";
export var sessionKey: string = "__sessionKey__";

export function capture() {
  const configs = core.getConfig(this.apiUrl, this.sessionKey).then((conf) => {
    return conf.json();
  });
  const cookies = core.getCookie();
  const fps = fp.getFP();
  const headless = getHeadlessScore();
  const browserInfo = getBrowserInfo();

  Promise.all([configs, cookies, fps, headless, browserInfo]).then(
    ([config, cookie, fp, hl, bi]) => {
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
          return core.postData(this.apiUrl + "/fpa", res);
        });

        encryptingAsync(
          {
            fk: this.sessionKey,
            ua: navigator.userAgent,
            uad: JSON.stringify(navigator.userAgentData),
            hscore: JSON.stringify(hl),
            binfo: JSON.stringify(bi),
          },
          {
            iv: config.iv,
            pass: config.ek,
            salt: config.sa,
          }
        ).then((res) => {
          return core.postData(this.apiUrl + "/bi", res);
        });

        encryptingAsync(
          {
            di: fp.Id,
            fk: this.sessionKey,
            subs: this.subscriberId,
            cookieCode: cookie,
            url:
              window.location && window.location.href
                ? window.location.href
                : "",
          },
          cryptConfig
        ).then((res) => {
          return core.postDataFp(this.apiUrl, res, config.tk);
        });
      }
    }
  );
}
