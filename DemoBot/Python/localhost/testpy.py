import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

import random
import sys
sys.path.insert(0, '../..')
from Constant.Config import config
from Constant.ListUrl import arrayUrl
from Constant.ListUserAgent import arrayUA

def async_execute():
    op = webdriver.ChromeOptions()

    print(config)
    # userAgent = arrayUA[random.randint(0, len(arrayUA)-1)]
    # op.add_argument("user-agent="+userAgent)

    # driver = webdriver.Chrome(executable_path="C:\\SeleniumWebDriver\\chromedriver.exe", options=op)

    # driver.maximize_window()

    # driver.get('https://fps-demo.nexdev.net/')

    # driver.find_element(by=By.NAME, value="Username").send_keys("test")
    # driver.find_element(by=By.NAME, value="Password").send_keys("1234aa")

    # driver.find_element(by=By.CLASS_NAME, value="btn-default").click()
    # # driver.find_element_by_css_selector('.btn.btn-default').click()

    # WebDriverWait(driver, 10).until(
    #             EC.title_is('Home Page - My ASP.NET Application')
    #         )

    # redirectUrl = arrayUrl[random.randint(0, len(arrayUrl)-1)]
    # driver.get(redirectUrl)

    # js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
    # driver.execute_script(js)

    # time.sleep(60)

async_execute()
# asyncio.run(async_execute())
