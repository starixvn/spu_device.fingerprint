import { load, BotDetectionResult } from '@fps/botd';

(async function() {
    const botd = await load({
        monitoring: false
    });
    var resultDetect: BotDetectionResult = botd.detect();
    var resultComponent = botd.getComponents();

    const detections = botd.getDetections();
    console.log('getDetections', detections);
    console.log('resultComponent', resultComponent);
    const botKeys = Object.keys(detections).filter(key => detections[key].bot).join(',');

    console.log('getDetections', botKeys);
    return {
        result: resultDetect,
        detection: JSON.stringify(botd.getDetections())
    };
})();