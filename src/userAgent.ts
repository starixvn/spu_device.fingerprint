import { IResult, UAParser } from "ua-parser-js";

export function getDeviceInfo(): IResult {
  const parser = new UAParser();
  const result = parser.getResult();
  return {
    ua: result.ua,
    device: result.device,
    browser: result.browser,
    engine: result.engine,
    os: result.os,
    cpu: result.cpu,
  };
}
