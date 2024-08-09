interface componentObject {
    value: {};
    duration: number;
  }
  function getNavigatorElementsAsJson(obj, currentDepth = 0, maxDepth = 3) {
    if (currentDepth >= maxDepth) {
        return null; // Stop if the maximum depth is reached
    }

    let result = {};

    const ignoredProperties = [
        'plugins',
        'mimeTypes',
        'userAgent',
        'language',
        'cookieEnabled',
        'doNotTrack',
        'userActivation',
		'appVersion'		
    ];

    for (let key in obj) {
        if (ignoredProperties.includes(key)) {
            continue; // Skip the ignored properties
        }

        try {
            let value = obj[key];

            // Ignore functions completely
            if (typeof value === 'function') {
                continue; // Skip functions
            } else if (typeof value === 'object' && value !== null && currentDepth + 1 < maxDepth) {
                result[key] = getNavigatorElementsAsJson(value, currentDepth + 1, maxDepth);
            } else {
				if(value != null)
				{
					result[key] = value;
				}
            }
        } catch (e) {
            result[key] = "[Unable to retrieve value]";
        }
    }

    return result;
}
export function getNavigator(): componentObject {
    const start = Date.now();
    let navigatorJson = getNavigatorElementsAsJson(navigator);
    let result = JSON.stringify(navigatorJson, null, 2); 

    return { value: result, duration: Date.now() - start };
}

export function getBrowser(): componentObject {
    const start = Date.now();
    var parser = new window.UAParser();
    var uaResult = parser.getResult();    
    return { value: uaResult.browser + " " +  uaResult.version, duration: Date.now() - start };
}

