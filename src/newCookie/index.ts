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

function getSetWindowName(key: string, value?: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        try {
            key = "name";
            if (isSet) {
                const currentValue = window[key] || '';
                if (!isValidObject(currentValue)) {
                    window[key] = value;
                }
                resolve(null);
            } else {
                resolve(window[key] || null);
            }
        } catch (exception) {
            reject(exception);
        }
    });
}

function isValidObject(obj: any): boolean {
    return typeof obj !== 'undefined' && !!obj;
}

function waitAllWithTimeout(promises: any[]): Promise<any[]> {
    const timeoutPromise: Promise<void> = new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timeout);
    });

    return Promise.all(promises.map((p: any) => Promise.race([p, timeoutPromise])));
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

export function getStorages(key: string = cookieKey): Promise<string> {
    try {
        isSet = false;
        var promises = storageHandlers.map(function (handler) {
            return new Promise(function (resolve) {
                resolve(handler(key, null));
            });
        });
        return waitAllWithTimeout(promises).then(function (cookies) {
            const joinedCookies = cookies
                .filter(cookie => cookie !== null && cookie !== undefined)
                .filter((cookie, index, self) => self.indexOf(cookie) === index)
                .join(',');
            return Promise.resolve(joinedCookies);
        });
    }
    catch (exception) {
    }
}

export function setStorage(key: string = cookieKey, value: string) {
    if (key && value) set(key, value);
}
