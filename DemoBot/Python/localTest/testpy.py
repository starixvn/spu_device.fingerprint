import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

import random
import sys
sys.path.insert(0, '../..')
from Constant.ListUrl import arrayUrlLocalTest
from Constant.ListUserAgent import arrayUA

def async_execute():
    op = webdriver.ChromeOptions()

    userAgent = arrayUA[random.randint(0, len(arrayUA)-1)]
    op.add_argument("user-agent="+userAgent)

    driver = webdriver.Chrome(executable_path="C:\\SeleniumWebDriver\\chromedriver.exe", options=op)

    driver.maximize_window()

    driver.get('https://alpha.nexdev.net/Local07/')

    driver.find_element(by=By.NAME, value="txtUserName").send_keys("sutest01")
    driver.find_element(by=By.NAME, value="txtPassWord").send_keys("1234aaAA")

    driver.find_element(by=By.CLASS_NAME, value="btnLogin").click()
    # driver.find_element_by_css_selector('.btn.btn-default').click()

    WebDriverWait(driver, 10).until(
                EC.title_is('Home')
            )

    redirectUrl = arrayUrlLocalTest[random.randint(0, len(arrayUrlLocalTest)-1)]
    driver.get(redirectUrl)

    js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
    driver.execute_script(js)

    time.sleep(60)

async_execute()
# asyncio.run(async_execute())
