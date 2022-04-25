import threading
from subprocess import check_output

def execute(script):
    check_output(script)
    
def process(env):
    print('start')

    # creating threads
    t11 = threading.Thread(target=execute, args=('node ../'+env+'/indexPuppeteer.js --browser=default',))
    t12 = threading.Thread(target=execute, args=('node ../'+env+'/indexPuppeteer.js --browser=chrome',))
    t13 = threading.Thread(target=execute, args=('node ../'+env+'/indexPuppeteer.js --browser=firefox',))
    t14 = threading.Thread(target=execute, args=('node ../'+env+'/indexPuppeteer.js --browser=edge',))
    t21 = threading.Thread(target=execute, args=('node ../'+env+'/indexSeleniumChromeDriver.js',))
    t22 = threading.Thread(target=execute, args=('node ../'+env+'/indexSeleniumEdgeDriver.js',))
    t23 = threading.Thread(target=execute, args=('node ../'+env+'/indexSeleniumFirefox.js',))
    t31 = threading.Thread(target=execute, args=('node ../'+env+'/indexPlaywright.js --browser=chromium',))
    t32 = threading.Thread(target=execute, args=('node ../'+env+'/indexPlaywright.js --browser=firefox',))
    # t33 = threading.Thread(target=execute, args=('node ../'+env+'/indexPlaywright.js --browser=webkit',))

    # starting threads
    t11.start()
    t12.start()
    t13.start()
    t14.start()
    # t21.start()
    # t22.start()
    # t23.start()
    t31.start()
    t32.start()
    # t33.start()

    # wait until all threads finish
    t11.join()
    t12.join()
    t13.join()
    t14.join()
    # t21.join()
    # t22.join()
    # t23.join()
    t31.join()
    t32.join()
    # t33.join()

    print('stop')

process('localhost')
# process('localTest')