import httplib, urllib, base64, json

import urllib, urllib2, time
from datetime import datetime
import Adafruit_DHT as dht






body = {"URL": "https://sliitrms.blob.core.windows.net/mycontainer/myblockblob"}

headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'eb87ea6cbae4490182b93fb61bc89cef',
}

try:
    conn = httplib.HTTPSConnection('api.projectoxford.ai')
    conn.request("POST", "/emotion/v1.0/recognize", json.dumps(body) , headers)
    response = conn.getresponse()
    
    data = response.read()
   
    print(data)
  
    conn.close()
except Exception as e:
    print("Error")
