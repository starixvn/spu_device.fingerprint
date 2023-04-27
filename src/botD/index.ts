import { load } from '@fps/botd';

export function loadBotD() {
    const botdPromise = load();
    return botdPromise
        .then((botd) => {
            var result = botd.detect();
            return {
                result: result,
                detection: JSON.stringify(botd.getDetections())
            };
        })
        .catch((error) => console.error(error));
}
