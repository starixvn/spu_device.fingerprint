import { load, BotDetectionResult } from '@fps/botd';

(async function() {
    const botd = await load({
        monitoring: false
    });
    var resultDetect: BotDetectionResult = botd.detect();
    var resultComponent = botd.getComponents();

    const ordered = Object.keys(resultComponent).sort().reduce(
        (obj, key) => { 
          obj[key] = resultComponent[key]; 
          return obj;
        }, 
        {}
      );

    console.log('resultDetect', resultDetect);
    console.log('resultComponent', resultComponent);
    // console.log('ordered', ordered);
    console.log('ordered JSON', JSON.stringify(ordered));
    return {
        result: resultDetect,
        detection: JSON.stringify(botd.getDetections())
    };
})();