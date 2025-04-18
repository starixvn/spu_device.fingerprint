import { UAParser as UAParserFn } from './ua-parser.js';

const UAParser = UAParserFn as unknown as new () => {
  getResult(): {
    browser: any;
    device: any;
    engine: any;
    os: any;
    cpu: any;
  };
};

let result: any = null;

function getResult() {
  try {
    if (result === null) {
      const parser = new UAParser();
      const uaResult = parser.getResult();

      result = {
        Browser: uaResult.browser,
        Device: uaResult.device,
        Engine: uaResult.engine,
        OS: uaResult.os,
      };
    }
  } catch (exception) {
    // optional log
  }

  return result;
}

export default {
  getResult
};
