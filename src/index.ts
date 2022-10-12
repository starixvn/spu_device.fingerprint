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
  const fps = fp.getFP().catch((error) => {
    var data = {
      function: "FingerPrint",
      exception: error.message,
    };
    core.postData(apiUrl + "/cle", JSON.stringify(data));
  });
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
          },
          cryptConfig
        )
          .then((res) => {
            return core.postData(apiUrl + "/fpa", res);
          })
          .catch((error) => {
            var data = {
              function: "FingerPrint Attribute",
              exception: error.message,
            };
            core.postData(apiUrl + "/cle", JSON.stringify(data));
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
        )
          .then((res) => {
            return core.postData(apiUrl + "/bi", res);
          })
          .catch((error) => {
            var data = {
              function: "Browser Info",
              exception: error.message,
            };
            core.postData(apiUrl + "/cle", JSON.stringify(data));
          });

        encryptingAsync(
          {
            di: fp && fp.Id,
            fk: sKey,
            subs: subId,
            cookieCode: cookie,
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
        )
          .then((res) => {
            return core.postDataFp(apiUrl, res, config.tk);
          })
          .catch((error) => {
            var data = {
              function: "FingerPrint",
              exception: error.message,
            };
            core.postData(apiUrl + "/cle", JSON.stringify(data));
          });
      }
    }
  );
}
