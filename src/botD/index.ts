import { load, BotDetectionResult } from '@fps/botd';

interface BotDResult{
    result: BotDetectionResult;
    detection: string;
}

export function loadBotD(): Promise<void | BotDResult> {
    const botdPromise = load({
        monitoring: false
    });
    return botdPromise
        .then((botd) => {
            var result: BotDetectionResult = botd.detect();
            return {
                result: result,
                detection: JSON.stringify(botd.getDetections())
            };
        })
        .catch((error) => console.error(error));
}
