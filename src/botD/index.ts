import { load, BotDetectionResult, BotDetectorInterface } from '@fps/botd';

interface BotDResult {
    result: BotDetectionResult;
    detection: string;
    component: any
}

function getBotDetections(botd: BotDetectorInterface){
    const detections = botd.getDetections();
    return Object.keys(detections).filter(key => detections[key].bot).join(',');
}

function getBotComponents(botd: BotDetectorInterface, resultDetect: BotDetectionResult){
    if(resultDetect?.bot){
        return JSON.stringify(botd.getComponents());
    }

    return null;
}

export default function loadBotD(): Promise<BotDResult | undefined> {
    try {
        const botdPromise = load({
            monitoring: false
        });
        return botdPromise
            .then((botd) => {
                var resultDetect: BotDetectionResult = botd.detect();

                return {
                    result: resultDetect,
                    detection: getBotDetections(botd),
                    component: getBotComponents(botd, resultDetect)
                };
            });
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
