(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    let allTestFunctions = [
        { name: "UserAgent", testFunction: testUserAgent, active: 1 },
        { name: "ChromeWindow", testFunction: testChromeWindow, active: 1 },
        { name: "Plugins", testFunction: testPlugins, active: 0 },
        { name: "AppVersion", testFunction: testAppVersion, active: 1 },
        { name: "ConnectionRtt", testFunction: testConnectionRtt, active: 1 },
        { name: "Webdriver", testFunction: testWebdriver, active: 1 },
    ];
    //* All Tests *//
    function testWebdriver() {
        let webdriver = navigator.webdriver;
        return webdriver ? 1 : 0;
    }
    // User Agent
    function testUserAgent() {
        if (/Headless/.test(window.navigator.userAgent)) {
            // Headless
            return 1;
        }
        else {
            // Not Headless
            return 0;
        }
    }
    // Window.Chrome
    function testChromeWindow() {
        if (eval.toString().length == 33 && !window.chrome) {
            // Headless
            return 1;
        }
        else {
            // Not Headless
            return 0;
        }
    }
    // Notification Permissions
    function testNotificationPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield navigator.permissions
                .query({ name: "notifications" })
                .then(function (permissionStatus) {
                if (Notification.permission === "denied" &&
                    permissionStatus.state === "prompt") {
                    // Headless
                    return 0.5;
                }
                else {
                    // Not Headless
                    return 0;
                }
            });
        });
    }
    // No Plugins
    function testPlugins() {
        let length = navigator.plugins.length;
        return length === 0 ? 1 : 0;
    }
    // App Version
    function testAppVersion() {
        let appVersion = navigator.appVersion;
        return /headless/i.test(appVersion) ? 1 : 0;
    }
    // Connection Rtt
    function testConnectionRtt() {
        let connection = navigator.connection;
        let connectionRtt = connection ? connection.rtt : undefined;
        if (connectionRtt === undefined) {
            return 0; // Flag doesn't even exists so just return NOT HEADLESS
        }
        else {
            return connectionRtt === 0 ? 0.5 : 0;
        }
    }
    //* Main Functions *//
    function getHeadlessScore() {
        return __awaiter(this, void 0, void 0, function* () {
            let score = 0;
            let testsRun = 0;
            let testRunDetail = "";
            return yield testNotificationPermissions()
                .then((x) => {
                score = x;
                testsRun++;
                testRunDetail = "NotificationPermissions : " + x + ", ";
            })
                .then(() => {
                allTestFunctions.forEach((test) => {
                    if (test.active == 1) {
                        let result = test.testFunction();
                        score += result;
                        testsRun++;
                        testRunDetail += test.name + " : " + result + ", ";
                    }
                });
                return {
                    score: score,
                    testsRun: testsRun,
                    testsDetail: testRunDetail.substring(0, testRunDetail.length - 2),
                };
            });
        });
    }

    function getBrowserName() {
        // OPERA 8.0+
        var isOpera = (!!window.opr && !!window.opr.addons) ||
            !!window.opera ||
            navigator.userAgent.indexOf(" OPR/") >= 0;
        if (isOpera)
            return "Opera";
        // FIREFOX 1.0+
        var isFirefox = typeof InstallTrigger !== "undefined";
        if (isFirefox)
            return "Firefox";
        // SAFARI 3.0+
        var isSafari = /constructor/i.test(window["HTMLElement"]) ||
            (function (p) {
                return p.toString() === "[object SafariRemoteNotification]";
            })(!window["safari"] ||
                (typeof safari !== "undefined" && safari.pushNotification));
        if (isSafari)
            return "Safari";
        // INTERNET EXPLORER 6-11
        var isIE = /*@cc_on!@*/ !!document["documentMode"];
        if (isIE)
            return "IE";
        // EDGE 20+
        var isEdge = !isIE && !!window["StyleMedia"];
        if (isEdge)
            return "Edge";
        // CHROME 1+
        var isChrome = !!window.chrome;
        if (isChrome)
            return "Chrome";
        // // BLINK ENGINE DETECTION
        // var isBlink = (isChrome || isOpera) && !!window.CSS;
        // if(isBlink) return 'Blink';
        return "Other";
    }
    function getOS() {
        var userAgent = window.navigator.userAgent, platform = window.navigator.platform, macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"], windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"], iosPlatforms = ["iPhone", "iPad", "iPod"], os = null;
        if (macosPlatforms.indexOf(platform) !== -1) {
            os = "Mac OS";
        }
        else if (iosPlatforms.indexOf(platform) !== -1) {
            os = "iOS";
        }
        else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = "Windows";
        }
        else if (/Android/.test(userAgent)) {
            os = "Android";
        }
        else if (!os && /Linux/.test(platform)) {
            os = "Linux";
        }
        return os;
    }
    function getBrowserInfo() {
        return {
            OSName: getOS(),
            BrowserName: getBrowserName(),
        };
    }

    function robotDetection() {
        return __awaiter(this, void 0, void 0, function* () {
            let headlessScore = yield getHeadlessScore();
            let browserInfo = getBrowserInfo();
            let data = {
                score: headlessScore.score,
                osName: browserInfo.OSName,
                browserName: browserInfo.BrowserName,
            };
            fetch(window.location.href + "/fpsRobotDetection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        });
    }
    robotDetection();

})();
