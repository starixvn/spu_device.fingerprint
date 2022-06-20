def ipInfo(file1, addr=''):
    from urllib.request import urlopen
    from json import load
    if addr == '':
        url = 'https://ipinfo.io/json'
    else:
        url = 'https://ipinfo.io/' + addr + '/json'
    print(url)
    res = urlopen(url)
    #response from url(if res==None then check connection)
    data = load(res)
    #will load the json response into data
    for attr in data.keys():
        #will print the data line by line
        country = ""
        timezone = ""
        if attr == "country":
            country = data[attr]
        if attr == "timezone":
            timezone = data[attr]
            file1.writelines(addr+","+country+","+timezone+"\n")
        # print(attr,' '*13+'\t->\t',data[attr])

# ipInfo('162.158.243.215')

def loopData():
    file = open("ipAddress.txt","r")
    text = file.readline()
    file1 = open("TimeZone.txt","w")

    while text != "":
        ipInfo(file1, text.rstrip("\n\r")) 
        text = file.readline()

loopData()