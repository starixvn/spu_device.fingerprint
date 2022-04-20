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
    t2 = threading.Thread(target=execute, args=('node ../'+env+'/indexSeleniumChromeDriver.js',))
    t3 = threading.Thread(target=execute, args=('node ../'+env+'/indexSeleniumEdgeDriver.js',))
    t4 = threading.Thread(target=execute, args=('node ../'+env+'/indexSeleniumFirefox.js',))

    # starting threads
    t11.start()
    t12.start()
    t13.start()
    t14.start()
    t2.start()
    t3.start()
    t4.start()

    # wait until all threads finish
    t11.join()
    t12.join()
    t13.join()
    t14.join()
    t2.join()
    t3.join()
    t4.join()

    print('stop')

process('localhost')