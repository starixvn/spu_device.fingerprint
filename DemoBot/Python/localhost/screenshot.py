import time
from selenium import webdriver
from selenium.webdriver.common.by import By
# from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
# from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


# binary = FirefoxBinary('C:\\Program Files\\Mozilla Firefox\\firefox.exe')
# firefox_capabilities = DesiredCapabilities.FIREFOX
# firefox_capabilities['marionette'] = True
# driver = webdriver.Firefox(firefox_binary=binary,executable_path='C:\\SeleniumWebDriver\\geckodriver.exe')

# capabilities = webdriver.DesiredCapabilities().FIREFOX
# capabilities['acceptInsecureCerts'] = False
# capabilities['marionette'] = False

op = webdriver.FirefoxOptions()
# op.add_argument("--headless")
driver = webdriver.Firefox(options=op)

# js = "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
# driver.execute_script(js)

driver.get("https://fps-demo.nexdev.net/")

# js = "var _navigator = {}; for (var i in navigator) _navigator[i] = navigator[i]; return JSON.stringify(_navigator);"
# data = driver.execute_script(js)
# print(data)

# js = "const canvas = document.getElementById('canvas'); const gl = canvas.getContext('webgl'); return gl.VERSION;"


# js = "const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl'); const debugInfo = gl.getExtension('WEBGL_debug_renderer_info'); const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL); const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL); return vendor + ' - ' + renderer;"
# js = "var body = document.getElementsByTagName(\"body\")[0]; var image = document.createElement(\"img\"); image.src = \"https://media.istockphoto.com/photos/blue-star-light-picture-id468075380?k=20&m=468075380&s=612x612&w=0&h=tSYRB-O2AGiV2wGjgx1Lqx9AO7ekUHYBFmVFbtUJRdo=\"; image.setAttribute(\"id\", \"fakeimage\"); body.appendChild(image);"
# driver.execute_script(js)

# time.sleep(1)

# js = "const img = document.getElementById(\"fakeimage\"); return img.width + \" - \" + img.height;"
# data = driver.execute_script(js)
# print(data)


# js = "return navigator.deviceMemory"
# data = driver.execute_script(js)
# print(data)

# driver.save_screenshot('screenie.png')
