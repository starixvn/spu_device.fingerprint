import  {
  isWebKit,
  isChromium,
  isGecko
} from "@fps/fingerprintjs";

declare global {
  interface Window {
    detectIncognito: typeof detectIncognito;
  }
}

export async function detectIncognito(): Promise<boolean>{
  return await new Promise(function (resolve, reject) {
    function newSafariTest (): void {
      const tmp_name = String(Math.random())

      try {
        const db = window.indexedDB.open(tmp_name, 1)

        db.onupgradeneeded = function (i) {
          const res = i.target?.result

          try {
            res.createObjectStore('test', {
              autoIncrement: true
            }).put(new Blob())

            resolve(false)
          } catch (e) {
            let message = e

            if (e instanceof Error) {
              message = e.message ?? e
            }

            if (typeof message !== 'string') {
              resolve(false); return
            }

            const matchesExpectedError = message.includes('BlobURLs are not yet supported')

            resolve(matchesExpectedError); return
          } finally {
            res.close()
            window.indexedDB.deleteDatabase(tmp_name)
          }
        }
      } catch (e) {
        resolve(false)
      }
    }

    function safariPrivateTest (): void {
      newSafariTest()
    }


    function getChromeQuotaLimit (): number {
      const w = window as any
      if (
        w.performance !== undefined &&
        w.performance.memory !== undefined &&
        w.performance.memory.jsHeapSizeLimit !== undefined
      ) {
        return (performance as any).memory.jsHeapSizeLimit
      }
      return 1073741824
    }

    function storageQuotaChromePrivateTest (): void {
      (navigator as any).webkitTemporaryStorage.queryUsageAndQuota(
        function (_: number, quota: number) {
          const quotaInMib = Math.round(quota / (1024 * 1024))
          const quotaLimitInMib = Math.round(getChromeQuotaLimit() / (1024 * 1024)) * 2

          resolve(quotaInMib < quotaLimitInMib)
        },
        function (e: any) {
          reject(
            new Error(
              'detectIncognito somehow failed to query storage quota: ' +
                e.message
            )
          )
        }
      )
    }


    function chromePrivateTest (): void {
      storageQuotaChromePrivateTest()
    }

    function firefoxPrivateTest (): void {
      resolve(navigator.serviceWorker === undefined)
    }

    function main (): void {
      if (isWebKit()) {
        safariPrivateTest()
      } else if (isChromium()) {
        chromePrivateTest()
      } else if (isGecko()) {
        firefoxPrivateTest()
      } else {
        reject(new Error('detectIncognito cannot determine the browser'))
      }
    }

    main()
  })
}

if (typeof window !== 'undefined') {
  window.detectIncognito = detectIncognito;
}

export default detectIncognito;