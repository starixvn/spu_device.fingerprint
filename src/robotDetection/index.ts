import { getHeadlessScore } from "../headlessDetection";
import { getBrowserInfo } from "../browserDetect";

async function robotDetection() {
  let headlessScore = await getHeadlessScore();
  let browserInfo = getBrowserInfo();
  let data = {
    score: headlessScore.score,
    osName: browserInfo.OSName,
    browserName: browserInfo.BrowserName,
  };

  fetch(window.location.href + "/fpsRobotDetection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

robotDetection();
