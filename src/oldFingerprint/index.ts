interface componentObject {
    value: {};
    duration: number;
}
function getNavigatorElementsAsJson(obj, isDuckDuckGo,currentDepth = 0, maxDepth = 3): any {
    if (currentDepth >= maxDepth) {
        return null; // Stop if the maximum depth is reached
    }

    let result = {};

    const ignoredProperties = new Set([
        'plugins',
        'mimeTypes',
        'userAgent',
        'language',
        'cookieEnabled',
        'doNotTrack',
        'userActivation',
        'appVersion'
    ]);


    for (let key in obj) {
        if (isDuckDuckGo && !key.match(/^[a-zA-Z0-9]+$/)) {
            continue;
        }

        if (ignoredProperties.has(key)) {
            continue; // Skip the ignored properties
        }

        try {
            let value = obj[key];

            // Ignore functions completely
            if (typeof value === 'function') {
                continue; // Skip functions
            } else if (typeof value === 'object' && value !== null && currentDepth + 1 < maxDepth) {
                if (isDuckDuckGo) {
                    var element = getNavigatorElementsAsJson(value, currentDepth + 1, maxDepth);
                    if (element !== null && element !== undefined && Object.keys(element).length > 0)
                        result[key] = element;
                }
                else {
                    result[key] = getNavigatorElementsAsJson(value, currentDepth + 1, maxDepth);
                } 
            } 
            else if (typeof value === "string") {
                if (isDuckDuckGo)
                    result[key] = value.replace(/[^\u0000-\u007F]/g, ""); // Remove non-ascii characters
                else
                    result[key] = value;
            } else {
                if (value != null) {
                    result[key] = value;
                }
            }
        } catch (e) {
            result[key] = "[Unable to retrieve value]";
        }
    }

    return result;
}

function isDuckDuckGo() {
    // Check if the current browser is DuckDuckGo
    if (typeof navigator === 'object' && navigator !== null && navigator.hasOwnProperty('duckDuckGo')) {
        return true; // Return a specific value for DuckDuckGo
    }
    return false;
}

export function getNavigator(): componentObject {
    const start = Date.now();
    var isDuckDuckGo = isDuckDuckGo();

    let navigatorJson = getNavigatorElementsAsJson(navigator, isDuckDuckGo);
    if (typeof navigatorJson.connection === "object") {
        navigatorJson.connection.downlink = null;
        navigatorJson.connection.downlinkMax = null;
        navigatorJson.connection.rtt = null;
    }
    let result = JSON.stringify(navigatorJson);

    return { value: result, duration: Date.now() - start };
}
