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

colorRed = "\033[91m {}\033[00m"
colorGreen = "\033[92m {}\033[00m"

def getUserInfo(args):
    if args.username == None and args.password == None:
        return loginInfo["username"], loginInfo["password"]
    else:
        return args.username, args.password

def async_execute():
    print(colorGreen.format('Start!'))

    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', dest='browser', type=str, help='Add browser')
    parser.add_argument('--username', dest='username', type=str, help='Add username')
    parser.add_argument('--password', dest='password', type=str, help='Add password')
    args = parser.parse_args()

    userInfo = getUserInfo(args)
    username = userInfo[0]
    password = userInfo[1]
    
    driver = getDriver(args)
    driver.maximize_window()

    for i in range(config["loop"]):
        print(colorGreen.format('Loop: ' + str(i+1)))
        Process(driver, username, password)
        if config["logout"] == 1:
            Logout(driver)
    
def Logout(driver):
    if config["inputDelay"] > 0:
        time.sleep(config["inputDelay"])
    print(colorGreen.format('Log out'))
    driver.get('http://localhost:44392/Login/Logout')

def Process(driver, username, password):
    print(colorRed.format('View LoginPage: ') + colorGreen.format(loginInfo["url"]))
    driver.get(loginInfo["url"])
    print(colorRed.format('Fill in the input: '))
    print(colorGreen.format('\tUsername: ' + username))
    print(colorGreen.format('\tPassword: ' + password))
    
    if config["inputDelay"] > 0:
        time.sleep(config["inputDelay"])
    driver.find_element(by=By.NAME, value="Username").send_keys(username)

    if config["inputDelay"] > 0:
        time.sleep(config["inputDelay"])
    driver.find_element(by=By.NAME, value="Password").send_keys(password)
    
    if config["inputDelay"] > 0:
        time.sleep(config["inputDelay"])
    print(colorRed.format('Click on button login!'))
    driver.find_element(by=By.CLASS_NAME, value="btn-default").click()

    print(colorRed.format('Waiting Home Page...'))
    print(colorRed.format('View Home Page!'))
    WebDriverWait(driver, 10).until(
                EC.title_is('Home Page - My ASP.NET Application')
            )


    if config["turnOffWebdriver"] == 1:
        print(colorRed.format('Change Webdriver'))
        js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
        driver.execute_script(js)

    if config["undetectBots"] == 1:
        print(colorRed.format('Execute ') + colorGreen.format('[UndetectBots]'))
        driver = undetectBots(driver)
    
    if config["waitingTime"] > 0:
        print(colorRed.format('Waiting before close browser...'))
        time.sleep(config["waitingTime"])

    if config["redirect"] == 1:
        print(colorRed.format('Navigate to another url'))
        redirectUrl = arrayUrl[random.randint(0, len(arrayUrl)-1)]
        driver.get(redirectUrl)

        if config["turnOffWebdriver"] == 1:
            print(colorRed.format('Re-change Webdriver'))
            js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
            driver.execute_script(js)

        if config["undetectBots"] == 1:
            print(colorRed.format('Re-execute ') + colorGreen.format('[UndetectBots]'))
            driver = undetectBots(driver)

def getDriver(args):
    print(colorRed.format('Get browser-driver'))

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
        print(colorRed.format('Change User-agent'))
        userAgent = arrayUA[random.randint(0, len(arrayUA)-1)]
        op.add_argument("user-agent="+userAgent)

    if args and args.browser == "chrome":
        print(colorRed.format('Return chromedriver'))
        return webdriver.Chrome(options=op)
    elif args and args.browser == "firefox":
        print(colorRed.format('Return geckodriver'))
        return webdriver.Firefox(options=op)
    elif args and args.browser == "edge":
        print(colorRed.format('Return msedgedriver'))
        return webdriver.Edge(options=op)
    else:
        print(colorRed.format('Return chromedriver'))
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

    print(colorRed.format('Done ') + colorGreen.format('[UndetectBots]'))

    # ua = driver.execute_script("return navigator.userAgent")
    # ua = ua.replace("Headless", "")
    # js = "Object.defineProperty(navigator, 'userAgent', {get: () => "+ua+"})"
    # driver.execute_script(js)
    
    return driver

if __name__ == '__main__':
    async_execute()

