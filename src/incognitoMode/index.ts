import {
  isWebKit,
  isChromium,
  isGecko
} from "@fps/fingerprintjs";

declare global {
  interface Window {
    incognitoMode: () => Promise<boolean>;
  }
}

function incognitoModeCallback(callback: (result: boolean) => void): void {
  const ONE_GB = 1073741824;

  function safariPrivateTest(): void {
    const tmp_name = String(Math.random());

    try {
      const db = window.indexedDB.open(tmp_name, 1);

      db.onupgradeneeded = function (i) {
        const res = i.target?.result;

        try {
          res.createObjectStore('test', {
            autoIncrement: true
          }).put(new Blob());

          callback(false);
        } catch (e) {
          let message = e;

          if (e instanceof Error) {
            message = e.message ?? e;
          }

          if (typeof message !== 'string') {
            callback(false);
            return;
          }

          const matchesExpectedError = message.includes('BlobURLs are not yet supported');

          callback(matchesExpectedError);
          return;
        } finally {
          res.close();
          window.indexedDB.deleteDatabase(tmp_name);
        }
      };
    } catch (e) {
      callback(false);
    }
  }

  function getChromeQuotaLimit(): number {
    const w = window as any;
    if (
      w.performance !== undefined &&
      w.performance.memory !== undefined &&
      w.performance.memory.jsHeapSizeLimit !== undefined
    ) {
      return (performance as any).memory.jsHeapSizeLimit;
    }
    return ONE_GB;
  }

  function chromePrivateTest(): void {
    (navigator as any).webkitTemporaryStorage.queryUsageAndQuota(
      function (_: number, quota: number) {
        const quotaInMib = Math.round(quota / (1024 * 1024));
        const quotaLimitInMib = Math.round(getChromeQuotaLimit() / (1024 * 1024)) * 2;

        callback(quotaInMib < quotaLimitInMib);
      },
      function (e: any) {
        callback(false);
        console.error(
          'incognitoMode somehow failed to query storage quota: ' +
          e.message
        );
      }
    );
  }

  (function () {
    if (isWebKit()) {
      safariPrivateTest();
    } else if (isChromium()) {
      chromePrivateTest();
    } else if (isGecko()) {
      callback(navigator.serviceWorker === undefined);
    } else {
      callback(false);
      console.error('incognitoMode cannot determine the browser');
    }
  })();
}

export function incognitoMode(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    incognitoModeCallback(resolve);
  });
}

if (typeof window !== 'undefined') {
  window.incognitoMode = incognitoMode;
}

export default incognitoMode;
