import { load, BotDetectionResult } from '@fps/botd';

(async function() {
    const botd = await load({
        monitoring: false
    });
    var resultDetect: BotDetectionResult = botd.detect();
    var resultComponent = botd.getComponents();

    console.log('resultDetect', resultDetect);
    console.log('resultComponent', resultComponent);
    return {
        result: resultDetect,
        detection: JSON.stringify(botd.getDetections())
    };
})();