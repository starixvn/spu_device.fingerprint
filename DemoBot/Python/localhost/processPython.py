import threading
from subprocess import check_output

def execute(script):
    check_output(script)
    
def process():
    print('start')

    # creating threads
    t11 = threading.Thread(target=execute, args=('py ./testpy.py --browser chrome',))
    t12 = threading.Thread(target=execute, args=('py ./testpy.py --browser firefox',))
    t13 = threading.Thread(target=execute, args=('py ./testpy.py --browser edge',))

    # starting threads
    t11.start()
    t12.start()
    t13.start()

    # wait until all threads finish
    # t11.join()
    # t12.join()
    # t13.join()

    print('stop')

process()
# process('localTest')