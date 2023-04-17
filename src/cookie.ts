import localForage from "localforage";

function initStorage(): Promise<string[]> {
    let localForageDrives: Array<string> = [];

    if (isLocalStorage()) {
        localForageDrives.push(localForage.LOCALSTORAGE);
    }

    if (isIndexDB()) {
        localForageDrives.push(localForage.INDEXEDDB);
    }

    if (isWebSQL()) {
        localForageDrives.push(localForage.WEBSQL);
    }
    return Promise.resolve(localForageDrives);
}

function isWebSQL(): boolean {
    try {
        if (!window.openDatabase) return false;
    } catch {
        return false;
    }

    return true;
}

function isIndexDB(): boolean {
    try {
        if (window.indexedDB) return true;
    } catch {
        return false;
    }

    return false;
}

function isLocalStorage(): boolean {
    try {
        if (window.localStorage) return true;
    } catch {
        return false;
    }

    return false;
}

function setCookie(name: string, value: string, days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie =
        name +
        "=" +
        (value || "") +
        expires +
        "; SameSite=None; Secure; path=/";
}

function getCookie(name: string): Promise<unknown> {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) == 0) {
            var cookie = c.substring(nameEQ.length, c.length);
            return Promise.resolve(cookie);
        }
    }

    return Promise.resolve(null);
}

function cookieHandler(cookieCode: string): Promise<string> {
    return new Promise((resolve) => {
        resolve(isGuid(cookieCode) ? cookieCode : generateUUID());
    });
}

function isGuid(cookieCode: string) {
    var regexGuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexGuid.test(cookieCode);
}

function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) {
                //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
}

function setStorage(name: string, value: string) {
    initStorage().then((drivers) => {
        drivers.forEach((drive) => {
            var storageDriver = localForage.createInstance({
                driver: drive,
                name: drive + "LS",
                storeName: "ls",
            });

            storageDriver.setItem(name, value, () => {});

            setCookie(name, value, 30);
        });
    });
}

function promiseAllWithTimeout(promises, timeout) {
    return Promise.race([
        Promise.all(promises),
        new Promise((resolve) => setTimeout(() => resolve(""), timeout)),
    ]);
}

export function storageHandler(name: string): Promise<string> {
    const getFirstMaxCountValue = function (arr) {
        let count = {};
        let maxCount = 0;
        let maxValue = null;

        for (let i = 0; i < arr.length; i++) {
            if (count[arr[i]] === undefined) {
                count[arr[i]] = 1;
            } else {
                count[arr[i]]++;
            }
            if (count[arr[i]] > maxCount) {
                maxCount = count[arr[i]];
                maxValue = arr[i];
            }
        }

        return maxValue;
    };

    return initStorage()
        .then((driver) => {
            var cookies = driver.map(async (drive) => {
                if (drive != null) {
                    try {
                        var storageDriver = localForage.createInstance({
                            driver: drive,
                            name: drive + "LS",
                            storeName: "ls",
                        });
                        return (await storageDriver.getItem)<string>(
                            name,
                            () => {}
                        );
                    } catch {
                        return Promise.resolve(null);
                    }
                }
            });
            cookies = [getCookie(name), ...cookies];
            return cookies;
        })
        .then((res) => {
            return promiseAllWithTimeout(res, 500).then((cookies) => {
                var latestCookie: string = getFirstMaxCountValue(cookies);
                return cookieHandler(latestCookie).then(
                    (cookieValue: string) => {
                        setStorage(name, cookieValue);
                        return cookieValue;
                    }
                );
            });
        });
}
