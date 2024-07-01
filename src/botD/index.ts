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
                const resultDetect: BotDetectionResult = botd.detect();
                const detections = botd.getDetections();
                const botDetections = Object.keys(detections).filter(key => detections[key].bot).join(',');

                let botComponents = '';
                if (resultDetect && resultDetect.bot) {
                    botComponents = JSON.stringify(botd.getComponents());
                }

                return {
                    result: resultDetect,
                    detection: botDetections,
                    component: botComponents,
                    isVer3: true
                };
            });
    } catch (error) {
        return Promise.resolve(undefined);
    }
}
