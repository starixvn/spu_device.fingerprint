var cookieKey = 'gfp';
var storageHandlers = [localStorage, indexedDb, cookie, windowName];
var isSet = false;
var timeout = 200;

function localStorage(key: string, value: string | null): Promise<string | null> {
    const result: Promise<string | null> = getSetLocalStorage(key, value);
    return result;
}

function getSetLocalStorage(key: string, value: string | null): Promise<string | null> {
    try {
        const localStorageObj: Storage = window.localStorage;
        if (localStorageObj) {
            if (isSet) {
                localStorageObj.setItem(key, value);
                return Promise.resolve(null);
            } else {
                value = localStorageObj.getItem(key);
                return Promise.resolve(value);
            }
        }
    } catch (exception: any) {
    }
}

function indexedDb(key: string, value: string | null): Promise<string | null> {
    const result: Promise<string | null> = getSetIndexedDb('indexedDB_ls', 'ls', key, value, isSet);
    return result;
}

function getSetIndexedDb(dbName: string, storeName: string, key: any, value: any, isSet: boolean): Promise<string | null> {
    return new Promise(function (resolve, reject) {
        const indexedDbObj: IDBFactory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

        if (indexedDbObj) {
            const request: IDBOpenDBRequest = indexedDbObj.open(dbName);

            request.onerror = function () {
                console.log('Failed to open database');
                resolve(null);
            };

            request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
                var db = (event.target as IDBOpenDBRequest).result;
                if (db.objectStoreNames.contains(storeName)) {
                    db.deleteObjectStore(storeName);
                }
                db.createObjectStore(storeName);
            };

            request.onsuccess = function (event: IDBVersionChangeEvent) {
                const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
                if (db) {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.close();
                        indexedDB.deleteDatabase(dbName);
                        const request2: IDBOpenDBRequest = indexedDB.open(dbName, 1);

                        request2.onupgradeneeded = function (event: IDBVersionChangeEvent) {
                            const db2: IDBDatabase = (event.target as IDBOpenDBRequest).result;
                            db2.createObjectStore(storeName);
                        };

                        request2.onsuccess = function (event: Event) {
                            const db2: IDBDatabase = (event.target as IDBOpenDBRequest).result;
                            const transaction: IDBTransaction = db2.transaction(storeName, "readwrite");
                            const store: IDBObjectStore = transaction.objectStore(storeName);
                            store.get(key).onsuccess = function (innerEvent: Event) {
                                if (isSet) {
                                    store.put(value, key);
                                    resolve(null);
                                }
                                else {
                                    const data: any = (innerEvent.target as IDBRequest).result;
                                    if (data) {
                                        resolve(data);
                                    }
                                    else {
                                        resolve(null);
                                    }
                                }
                            };
                        };
                    }
                    else {
                        const transaction: IDBTransaction = db.transaction(storeName, 'readwrite');
                        if (transaction.db.objectStoreNames.contains(storeName)) {
                            const store: IDBObjectStore = transaction.objectStore(storeName);
                            store.get(key).onsuccess = function (innerEvent: Event) {
                                if (isSet) {
                                    store.put(value, key);
                                    resolve(null);
                                } else {
                                    const data: any = (innerEvent.target as IDBRequest).result;
                                    if (data) {
                                        resolve(data);
                                    } else {
                                        resolve(null);
                                    }
                                }
                            };
                        }
                    }
                }
            };
        }
    });
}

function cookie(key: string, value: string | null): Promise<string | null> {
    const result: Promise<string | null> = getSetCookie(key, value);
    return result;
}

function getSetCookie(key: string, value: string | null): Promise<string | null> {
    return new Promise(function (resolve, reject) {
        try {
            if (isSet) {
                let expires: string = '';
                let date = new Date();
                    date.setFullYear(date.getFullYear() + 1);
                    expires = '; expires=' + date.toUTCString();

                const setValue = key + '=' + (value || '') + expires + '; SameSite=None; Secure; path=/';
                document.cookie = setValue;
                resolve(null);
            } else {
                let cookie: string = null;
                const cookieArr: string[] = document.cookie.split(';');

                for (let i: number = 0; i < cookieArr.length; i++) {
                    const cookiePair: string[] = cookieArr[i].split('=');
                    if (key == cookiePair[0].trim()) {
                        cookie = decodeURIComponent(cookiePair[1]);
                    }
                }

                resolve(cookie);
            }
        } catch (exception) {
        }
    });
}

function windowName(key: string, value: string | any): Promise<string | null> {
    const result: Promise<string | null> = getSetWindowName(key, value);
    return result;
}

function getSetWindowName(key: string, value: string | any): Promise<string | null> {
    return new Promise(function (resolve, reject) {
        try {
            if (isSet) {
                var currentValue = window[key] || '';
                if (!isValidObject(currentValue) || validateUUID(currentValue)) {
                    window[key] = value;
                }
                resolve(null);
            }
            else {
                value = window[key];
                if (!validateUUID(value)) {
                    value = null;
                }
                resolve(value);
            }
        } catch (exception) {
        }
    });
}

function isValidObject(obj: any): boolean {
    return typeof obj !== 'undefined' && !!obj;
}

function generateUUIDv4(): string {
    let uuid: string = '';

    for (let i: number = 0; i < 32; i++) {
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        const random: number = (Math.random() * 16) | 0;
        if (i === 12) {
            uuid += '4';
        } else if (i === 16) {
            uuid += ((random & 3) | 8).toString(16);
        } else {
            uuid += random.toString(16);
        }
    }

    return uuid;
}

function validateUUID(uuid: string): boolean {
    const uuidRegex: RegExp = /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[8|9|aA|bB][a-f\d]{3}-[a-f\d]{12}$/i;

    if (!uuidRegex.test(uuid)) {
        return false;
    }

    // Kiểm tra phiên bản UUID
    const versionBits: number = parseInt(uuid.charAt(14), 16);
    if (versionBits !== 4) {
        return false;
    }

    // Kiểm tra trường hợp của ký tự
    if (uuid !== uuid.toLowerCase()) {
        return false;
    }

    return true;
}

function waitAllWithTimeout(promises: any[]): Promise<any[]> {
    const timeoutPromise: Promise<void> = new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timeout);
    });

    return Promise.all(promises.map((p: any) => Promise.race([p, timeoutPromise])));
}

function getFirstMaxCountValue(arr: string | any[]): Promise<string> {
    let count = {};
    let maxCount = 0;
    let maxValue = null;

    if (arr && Array.isArray(arr) && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if (count[arr[i]] === undefined) {
                count[arr[i]] = 1;
            } else {
                count[arr[i]]++;
            }
            if (count[arr[i]] > maxCount && arr[i] != undefined) {
                maxCount = count[arr[i]];
                maxValue = arr[i];
            }
        }
    }

    return new Promise((resolve) => {
        resolve(validateUUID(maxValue) ? maxValue : generateUUIDv4());
    });
}

function get(key) {
    try {
        isSet = false;

        const promises = storageHandlers.map((handler) => {
            return new Promise((resolve) => {
                resolve(handler(key, null));
            });
        });
        return waitAllWithTimeout(promises).then((cookies) => {
            return getFirstMaxCountValue(cookies).then((cookieValue) => {
                return Promise.resolve(cookieValue);
            });
        });
    } catch (exception) {
    }
}

function set(key: string, value: string) {
    try {
        isSet = true;
        storageHandlers.forEach(function (handler) {
            handler(key, value);
        });
    } catch (exception) {
    }
}

export function getStorage(key: string = cookieKey): Promise<string> {
    return get(key);
}

export function setStorage(key: string = cookieKey, value: string) {
    if (key && value) set(key, value);
}
