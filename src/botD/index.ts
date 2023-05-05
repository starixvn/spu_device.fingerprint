import { load, BotDetectionResult } from '@fps/botd';

interface BotDResult{
    result: BotDetectionResult;
    detection: string;
}

export async function loadBotD(): Promise<BotDResult | undefined> {
    try {
        const botd = await load({
            monitoring: false
        });
        var resultDetect: BotDetectionResult = botd.detect();
        return {
            result: resultDetect,
            detection: JSON.stringify(botd.getDetections())
        };
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
