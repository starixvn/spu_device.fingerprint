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

                return {
                    result: resultDetect,
                    detection: JSON.stringify(botd.getDetections()),
                    component: JSON.stringify(botd.getComponents())
                };
            });
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
