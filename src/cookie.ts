import localForage from "localforage";
import * as appConfig from "./appConfig";

interface cookieResult {
  id: number;
  code: string;
}

function initStorage(): Promise<string[]> {
  let localForageDrives: Array<string> = [];

  if (isIndexDB()) {
    localForageDrives.push(localForage.INDEXEDDB);
  }

  if (isWebSQL()) {
    localForageDrives.push(localForage.WEBSQL);
  }

  if (isLocalStorage()) {
    localForageDrives.push(localForage.LOCALSTORAGE);
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

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: string): string {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function cookieHandler(cookieValue: string): Promise<cookieResult> {
  var value = cookieValue != null ? "/" + cookieValue : "";
  return fetch(appConfig.apiUrl + "/getCookie" + value, {
    method: "GET",
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
}

function setStorage(name: string, value: string) {
  initStorage().then((drivers) => {
    drivers.forEach((drive) => {
      var storageDriver = localForage.createInstance({
        driver: drive,
        name: drive + "-EC",
        storeName: "ec",
      });

      storageDriver
        .setItem(name, value, () => {})
        .then(console.log)
        .catch((e) => {
          console.log(e.message);
        });

      setCookie(name, value, 30);
    });
  });
}

export function storageHandler(name: string): Promise<number> {
  return initStorage()
    .then((driver) => {
      var cookies = driver.map(async (drive) => {
        if (drive != null) {
          try {
            var storageDriver = localForage.createInstance({
              driver: drive,
              name: drive + "-EC",
              storeName: "ec",
            });
            return await storageDriver.getItem<string>(name, () => {});
          } catch {
            return Promise.resolve(null);
          }
        }
      });

      cookies.push(Promise.resolve(getCookie(name)));

      return cookies;
    })
    .then((res) => {
      return Promise.all(res).then((cookies) => {
        var latestCookie: string = null;
        for (const cookie of cookies) {
          console.log(cookie);
          if (cookie != null) {
            latestCookie = cookie;
            break;
          }
        }

        return cookieHandler(latestCookie).then((result: cookieResult) => {
          setStorage(name, result.code);
          return result.id;
        });
      });
    });
}
