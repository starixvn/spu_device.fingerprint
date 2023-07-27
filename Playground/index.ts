import {checking} from '../src/deviceType/index'

// import { load, BotDetectionResult } from '@fps/botd';
// import loadBotD from '../src/botD/index';

// (async function() {
//     const botd = await loadBotD();
//     console.log('botd', botd);
// })();

// (async function() {
//     const botd = await load({
//         monitoring: false
//     });
//     var resultDetect: BotDetectionResult = botd.detect();
//     var resultComponent = botd.getComponents();
//     console.log('resultDetect', resultDetect);
//     console.log('resultComponent', resultComponent);
//     console.log('resultComponent JSON', JSON.stringify(resultComponent));
//     return {
//         result: resultDetect,
//         detection: JSON.stringify(botd.getDetections())
//     };
// })();

console.log("Mobile", checking().device);