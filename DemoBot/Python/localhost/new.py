import time,undetected_chromedriver as uc
from selenium import webdriver
import selenium.webdriver.support.expected_conditions as ec
import selenium.webdriver.support.wait as wwait

def run():
    dr=uc.Chrome()
    dr.get('https://nowsecure.nl')
    # wwait.WebDriverWait(dr,15).until(ec.visibility_of_element_located(('css selector','.hystericalbg')))
    # print('====================WORKING=============')
    time.sleep(30)

if __name__ == '__main__':
    run()