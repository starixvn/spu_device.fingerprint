import time, argparse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

import random
import sys
sys.path.insert(0, '../..')
from Constant.Config import config, loginInfo
from Constant.ListUrl import arrayUrl
from Constant.ListUserAgent import arrayUA

def async_execute():
    driver = getDriver()
    driver.maximize_window()

    driver.get(loginInfo["url"])

    if config["inputDelay"] > 0:
        time.sleep(config["inputDelay"])
    driver.find_element(by=By.NAME, value="txtUserName").send_keys(loginInfo["username"])

    if config["inputDelay"] > 0:
        time.sleep(config["inputDelay"])
    driver.find_element(by=By.NAME, value="txtPassWord").send_keys(loginInfo["password"])

    if config["inputDelay"] > 0:
        time.sleep(config["inputDelay"])
    driver.find_element(by=By.CLASS_NAME, value="btnLogin").click()


    WebDriverWait(driver, 100).until(
                EC.title_is('Home')
            )

    time.sleep(0.5)
    if config["turnOffWebdriver"] == 1:
        js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
        driver.execute_script(js)

    if config["undetectBots"] == 1:
        driver = undetectBots(driver)

    if config["redirect"] == 1:
        redirectUrl = arrayUrl[random.randint(0, len(arrayUrl)-1)]
        driver.get(redirectUrl)

        if config["turnOffWebdriver"] == 1:
            js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
            driver.execute_script(js)

        if config["undetectBots"] == 1:
            driver = undetectBots(driver)

    
    if config["waitingTime"] > 0:
        time.sleep(config["waitingTime"])


def getDriver():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', dest='browser', type=str, help='Add browser')
    args = parser.parse_args()

    if args and args.browser == "chrome":
        op = webdriver.ChromeOptions()
    elif args and args.browser == "firefox":
        op = webdriver.FirefoxOptions()
    elif args and args.browser == "edge":
        op = webdriver.EdgeOptions()
    else:
        op = webdriver.ChromeOptions()
        
    if config["closeBrowser"] == 0 and args.browser != "firefox":
        op.add_experimental_option("detach", True)

    if config["headless"] == 1:
        op.add_argument("--headless")

    if config["changeUA"] == 1:
        userAgent = arrayUA[random.randint(0, len(arrayUA)-1)]
        op.add_argument("user-agent="+userAgent)

    if args and args.browser == "chrome":
        return webdriver.Chrome(options=op)
    elif args and args.browser == "firefox":
        return webdriver.Firefox(options=op)
    elif args and args.browser == "edge":
        return webdriver.Edge(options=op)
    else:
        return webdriver.Chrome(options=op)

def undetectBots(driver):

    if config["turnOffWebdriver"] == 0:
        js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
        driver.execute_script(js)
        
    js = "Object.defineProperty(Notification, 'permission', {get: () => true})"
    driver.execute_script(js)
    js = "Object.defineProperty(navigator, 'plugins', {get: () => true})"
    driver.execute_script(js)
    js = "Object.defineProperty(window, 'chrome', {get: () => true})"
    driver.execute_script(js)
    js = "var i = navigator.connection; Object.defineProperty(i, 'rtt', { value: 2 }); Object.defineProperty(navigator, 'connection', {get() {return i;}});"
    driver.execute_script(js)

    # ua = driver.execute_script("return navigator.userAgent")
    # ua = ua.replace("Headless", "")
    # js = "Object.defineProperty(navigator, 'userAgent', {get: () => "+ua+"})"
    # driver.execute_script(js)
    
    return driver

if __name__ == '__main__':
    async_execute()
