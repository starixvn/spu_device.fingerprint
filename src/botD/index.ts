import { load, BotDetectionResult } from '@fps/botd';

interface BotDResult {
    result: BotDetectionResult;
    detection: string;
    component: any
}

export default function loadBotD(): Promise<BotDResult | undefined> {
    try {
        const botdPromise = load({
            monitoring: false
        });
        return botdPromise
            .then((botd) => {
                var resultDetect: BotDetectionResult = botd.detect();
                const detections = botd.getDetections();
                const botDetectionTrue = Object.keys(detections).filter(key => detections[key].bot).join(',');

                return {
                    result: resultDetect,
                    detection: botDetectionTrue,
                    component: JSON.stringify(botd.getComponents())
                };
            });
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
