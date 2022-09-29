import { encryptingAsync } from "./crypt";
import * as fp from "./fp";
import { getHeadlessScore } from "./headlessDetection";
import { getBrowserInfo } from "./browserDetect";
import * as core from "./core";

export async function getFPID() {
  return await fp.getFP();
}

export function capture(apiUrl: string, subId: string, sKey: string) {
  const configs = core.getConfig(apiUrl, sKey).then((conf) => {
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
        )
          .then((res) => {
            return core.postData(apiUrl + "/fpa", res);
          })
          .catch((error) => core.postData(apiUrl + "/cle", error.message));

        encryptingAsync(
          {
            fk: sKey,
            hscore: JSON.stringify(hl),
            binfo: JSON.stringify(bi),
          },
          {
            iv: config.iv,
            pass: config.ek,
            salt: config.sa,
          }
        )
          .then((res) => {
            return core.postData(apiUrl + "/bi", res);
          })
          .catch((error) => core.postData(apiUrl + "/cle", error.message));

        encryptingAsync(
          {
            di: fp.Id,
            fk: sKey,
            subs: subId,
            cookieCode: cookie,
            url:
              window.location && window.location.href
                ? window.location.href
                : "",
            da: {
              cv: fp.CheckCanvasDefender,
              gl: fp.CheckWebGLDefender,
              fd: fp.CheckFontDefender,
              ac: fp.CheckAudioContextDefender,
            },
          },
          cryptConfig
        )
          .then((res) => {
            return core.postDataFp(apiUrl, res, config.tk);
          })
          .catch((error) => core.postData(apiUrl + "/cle", error.message));
      }
    }
  );
}
