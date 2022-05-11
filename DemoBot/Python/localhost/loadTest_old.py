import threading
from subprocess import check_output

colorGreen = "\033[92m {}\033[00m"

def execute(script):
    check_output(script)

def async_execute():
    print(colorGreen.format('Start!'))
    readFile()
    
def readFile():
    file = open("./Constant/fileLogin.txt","r")
    text = file.readline() 
    threads = []
    while text != "":
        item = text.split('/')
        print(item[0], item[1])
        text = file.readline()
        thread = threading.Thread(target=execute, args=('py ./testpy.py --username ' + item[0] + ' --password ' + item[1],))
        threads.append(thread)
    
    for thread in threads:
        thread.start()

if __name__ == '__main__':
    async_execute()