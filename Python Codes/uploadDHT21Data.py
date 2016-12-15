"""
Python sample for Raspberry Pi which reads temperature and humidity values from
a DHT22 sensor, and sends that data to Power BI for use in a streaming dataset.
"""

import urllib, urllib2, time
from datetime import datetime
import Adafruit_DHT as dht

# type of sensor that we're using
SENSOR = dht.DHT22 	

# pin which reads the temperature and humidity from sensor
PIN = 22			

# REST API endpoint, given to you when you create an API streaming dataset
# Will be of the format: https://api.powerbi.com/beta/<tenant id>/datasets/< dataset id>/rows?key=<key id>
REST_API_URL = "https://api.powerbi.com/beta/72f988bf-86f1-41af-91ab-2d7cd011db47/datasets/36861ff2-d504-4df7-b4d5-74df38598b9c/rows?key=KLu%2FjaW%2BsyK1Zyt6XJ1b1bsl4u4R17b33cLcjcIXsoXaFtSouNbTb1OpWfAUhq%2FazrD%2Bb1I5xzMBYJSqdqA9YQ%3D%3D"

# Gather temperature and sensor data and push to Power BI REST API
while True:
	try:
		# read and print out humidity and temperature from sensor
		humidity,temp = dht.read_retry(SENSOR, PIN)
		print 'Temp={0:0.1f}*C Humidity={1:0.1f}%'.format(temp, humidity)
		
		# ensure that timestamp string is formatted properly
		now = datetime.strftime(datetime.now(), "%Y-%m-%dT%H:%M:%S%Z")
	
		# data that we're sending to Power BI REST API
		data = '[{{ "timestamp": "{0}", "temperature": "{1:0.1f}", "humidity": "{2:0.1f}" }}]'.format(now, temp, humidity)
	
		# make HTTP POST request to Power BI REST API
		req = urllib2.Request(REST_API_URL, data)
		response = urllib2.urlopen(req)
		print("POST request to Power BI with data:{0}".format(data))
		print("Response: HTTP {0} {1}\n".format(response.getcode(), response.read()))	
	
		time.sleep(120)
	except urllib2.HTTPError as e:
		print("HTTP Error: {0} - {1}".format(e.code, e.reason))
	except urllib2.URLError as e:
		print("URL Error: {0}".format(e.reason))
	except Exception as e:
		print("General Exception: {0}".format(e))




