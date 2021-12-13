import DeviceDetector, { DeviceDetectorResult } from "device-detector-js";
import BotDetector from "device-detector-js/dist/parsers/bot";
import { BotResult } from "device-detector-js/dist/parsers/bot/typing";

export function deviceDetector(): DeviceDetectorResult {
  const deviceDetector = new DeviceDetector();

  const userAgent = navigator.userAgent;

  return deviceDetector.parse(userAgent);
}

export function botDetector(): BotResult {
  const botDetector = new BotDetector();
  const userAgent = navigator.userAgent;

  return botDetector.parse(userAgent);
}
