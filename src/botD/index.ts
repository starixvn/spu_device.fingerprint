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

                var component = botd.getComponents();
                const componentOrdered = Object.keys(component).sort().reduce(
                    (obj, key) => {
                        obj[key] = component[key];
                        return obj;
                    },
                    {}
                );

                return {
                    result: resultDetect,
                    detection: JSON.stringify(botd.getDetections()),
                    component: JSON.stringify(componentOrdered)
                };
            });
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
