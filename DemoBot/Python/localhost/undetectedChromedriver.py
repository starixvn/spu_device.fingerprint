import time, argparse, undetected_chromedriver.v2 as uc
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
    driver.find_element(by=By.NAME, value="Username").send_keys(loginInfo["username"])
    driver.find_element(by=By.NAME, value="Password").send_keys(loginInfo["password"])

    driver.find_element(by=By.CLASS_NAME, value="btn-default").click()

    WebDriverWait(driver, 10).until(
                EC.title_is('Home Page - My ASP.NET Application')
            )

    if config["redirect"] == 1:
        redirectUrl = arrayUrl[random.randint(0, len(arrayUrl)-1)]
        driver.get(redirectUrl)

    if config["turnOffWebdriver"] == 1:
        js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
        driver.execute_script(js)

    if config["waitingTime"] > 0:
        time.sleep(config["waitingTime"])


def getDriver():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', dest='browser', type=str, help='Add browser')
    args = parser.parse_args()

    if args and args.browser == "chrome":
        op = uc.ChromeOptions()
    elif args and args.browser == "firefox":
        op = uc.FirefoxOptions()
    elif args and args.browser == "edge":
        op = uc.EdgeOptions()
    else:
        op = uc.ChromeOptions()

    # op.add_argument('proxy-server=106.122.8.54:3128')
        
    # if config["closeBrowser"] == 0:
    #     op.add_experimental_option("detach", True)

    if config["headless"] == 1:
        op.add_argument("--headless")

    if config["changeUA"] == 1:
        userAgent = arrayUA[random.randint(0, len(arrayUA)-1)]
        op.add_argument("user-agent="+userAgent)

    if args and args.browser == "chrome":
        return uc.Chrome(options=op)
    elif args and args.browser == "firefox":
        return uc.Firefox(options=op)
    elif args and args.browser == "edge":
        return uc.Edge(options=op)
    else:
        return uc.Chrome(options=op)

if __name__ == '__main__':
    async_execute()
# asyncio.run(async_execute())
