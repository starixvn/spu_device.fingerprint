import { encryptingAsync } from "./crypt";
import * as fp from "./fp";
import { getHeadlessScore } from "./headlessDetection";
import { getBrowserInfo } from "./browserDetect";
import * as core from "./core";

export async function debugFP() {
  return await fp.getFP();
}
export async function debugAudio() {
  return await fp.getAudio();
}
export function debugBrowserSupport() {
  return fp.getBrowserSupport();
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
            di: fp && fp.Id,
            attr: fp && fp.Properties,
            acpt: config.acpt,
            enc: config.enc,
            hk: config.hk,
          },
          cryptConfig
        ).then((res) => {
          core.postDataAuthorization(
            apiUrl + "/fpa",
            JSON.stringify(res),
            config.tk
          );
        });

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
        ).then((res) => {
          core.postDataAuthorization(
            apiUrl + "/bi",
            JSON.stringify(res),
            config.tk
          );
        });

        encryptingAsync(
          {
            di: fp && fp.Id,
            fk: sKey,
            subs: subId,
            ckc: cookie,
            url:
              window.location && window.location.href
                ? window.location.href
                : "",
            da: {
              cv: fp && fp.CheckCanvasDefender,
              gl: fp && fp.CheckWebGLDefender,
              fd: fp && fp.CheckFontDefender,
              ac: fp && fp.CheckAudioContextDefender,
            },
          },
          cryptConfig
        ).then((res) => {
          core.postDataAuthorization(
            apiUrl + "/fp",
            JSON.stringify(res),
            config.tk
          );
        });
      }
    }
  );
}
