
var sessionKey = '__sessionKey__';
var apiUrl = '__apiUrl__';
var portalAPIUrl = '__portalAPIUrl__';
var version = '2023042704_beta';
var key = '__key__';

declare var globalFP: any; // FingerprintJS 2.1
declare var fpNewCookie: any;
declare var encrypt: any;
declare var isWebKit: any;
declare var isDesktopWebKit: any;
declare var isIPad: any;

function requireJS(_url) {
    return new Promise(function (resolve, reject) {
        try {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = _url;
            script.async = true;
            script.defer = true;
            script.addEventListener('load', function () {
                return resolve(script);
            }, false);
            script.addEventListener('error', function () {
                return reject(script);
            }, false);

            document.head.appendChild(script);
        }
        catch (err) {
            log(portalAPIUrl, "Load Script", err.message + ' | ' + sessionKey);
        }
    });
}
function get(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-cache"
        }
    });
}
function getPlatform() {
    var platform = navigator.platform;
    if (platform === 'MacIntel') {
        if (typeof isWebKit === 'function' && typeof isDesktopWebKit === 'function' && typeof isIPad === 'function') {
            if (isWebKit() && !isDesktopWebKit()) {
                return isIPad() ? 'iPad' : 'iPhone';
            }
        }
    }
    if (platform.length > 45) {
        return 'Android';
    }
    return platform;
}
function getWithCache(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "max-age=31536000, immutable"
        }
    });
}
function inject(value) {
    var gfpInput: HTMLInputElement | null = document.getElementById("__fdi") as HTMLInputElement;

    if (gfpInput === null) {
        var container = document.forms[0] || document.body;
        gfpInput = document.createElement("INPUT") as HTMLInputElement;
        gfpInput.id = gfpInput.name = "__fdi";
        gfpInput.setAttribute("type", "hidden");
        gfpInput.setAttribute("value", value);
        container.appendChild(gfpInput);
    }
    else {
        gfpInput.setAttribute("value", value);
    }
}
function post(url, data) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
}
function postAuthor(url, data, gjt) {
    var encodeData = encrypt.encode(JSON.stringify(data), key);
    fetch(url + '/' + version , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + gjt
        },
        body: JSON.stringify(encodeData)
    });
}
function serializeDate(functionName, exception) {

    var currentOrigin = "";
    if (window.location && window.location.origin) {
        currentOrigin = window.location.origin;
    }

    var data = {
        function: functionName,
        exception: exception + " | " + currentOrigin,
    };

    return JSON.stringify(data);
}
function log(url, functionName, exception) {
    var data = serializeDate(functionName, exception);
    post(url + "/cle", data);
}
function logByXHR(url, functionName, exception) {
    var data = serializeDate(functionName, exception);

    fetch(url + "/cle", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data,
    }).catch(function (err) {
        sendXHR('POST', portalAPIUrl + '/log/cle', data, null);
    });
}
function sendXHR(method, url, jsonData, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");

    xhr.onload = function () {
        if (typeof callback === 'function') {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(null, xhr.responseText);
            } else {
                callback(xhr.statusText);
            }
        }
    };

    xhr.onerror = function () {
        if (typeof callback === 'function') {
            callback(xhr.statusText);
        }
    };

    xhr.send(jsonData);
}

function postFpData(gjt) {
    requireJS(apiUrl + '/s/fp/' + version).then(() => {
        return globalFP.getFP(encrypt.hashMD5);
    }).then(res => {
        var data = {
            'Fingerprint': {
                "Id": res.Id,
                "Attributes": res.Properties,
                "Platform": getPlatform()
            },
            'SessionKey': sessionKey
        };
        postAuthor(portalAPIUrl + '/fp', data, gjt);
    }).catch((err) => {
        log(portalAPIUrl, "Load Script fp", err.message + ' | ' + sessionKey);
    });
}
function postHdData(gjt) {
    postAuthor(portalAPIUrl + '/hd', { 'SessionKey': sessionKey }, gjt);
}
function postCeData(gjt) {
    requireJS(apiUrl + '/s/ce/' + version).then(() => {
        return fpNewCookie.getStorage();
    }).then(cookie => {
        var data = {
            'Cookie': cookie,
            'SessionKey': sessionKey
        };

        postAuthor(portalAPIUrl + '/ce', data, gjt);
        fpNewCookie.setStorage('gfp', cookie);
    });
}
export function start() {
    inject(sessionKey);
    get(apiUrl + '/s/gjt')
        .then(response => {
            return response.text();
        })
        .then((gjt) => {
            if (gjt != "") {
                requireJS(apiUrl + '/s/crt/' + version).then(() => {
                    postHdData(gjt);
                    postFpData(gjt);
                    postCeData(gjt);
                }).catch((err) => {
                    log(portalAPIUrl, "Load Script crt", err.toString() + ' | ' + sessionKey);
                });
            }
            else {
                logByXHR(portalAPIUrl, "Load Script gjt", "Script gjt is empty" + ' | ' + sessionKey);
            }
        }).catch((err) => {
            logByXHR(portalAPIUrl, "Load Script gjt", err.toString() + ' | ' + sessionKey);
        });
}