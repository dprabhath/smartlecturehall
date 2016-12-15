import httplib, urllib, base64, json
import urllib, urllib2, time
from datetime import datetime
import Adafruit_DHT as dht
import MySQLdb
import pymysql.cursors
import pymysql
import urllib, urllib2, time
from datetime import datetime
import Adafruit_DHT as dht
import MySQLdb



REST_API_URL = "https://api.powerbi.com/beta/72f988bf-86f1-41af-91ab-2d7cd011db47/datasets/aee4c224-8d16-42df-ade5-21cdf7c8267b/rows?key=4YJt4UJJkrMOahLINrMA93dUzqeqU4xElM48WzO2uUiF%2Bury6DEybncVBRCLrl7LBugLWvE0wqH0P6drdLHGCQ%3D%3D"
while True:
	   try:



		body = {"URL": "https://sliitrms1.blob.core.windows.net/mycontainer/myblockblob"}
		
		headers = {
		    'Content-Type': 'application/json',
		    'Ocp-Apim-Subscription-Key': 'eb87ea6cbae4490182b93fb61bc89cef',
		}
		
		try:
		    conn = httplib.HTTPSConnection('api.projectoxford.ai')
		    conn.request("POST", "/emotion/v1.0/recognize", json.dumps(body) , headers)
		    response = conn.getresponse()
		    
		    data = response.read()
		    ##print(data)
		    
		    jsondata = json.loads(data)
		    ##data1 = len(JSON[])
                    val1 = len(jsondata)
                    

                    print val1
		    people = 0



		    ##print(jsondata)
		    
		       
                    
                   
	        

                    
		   
		    
                    
		
                    
	          

  			
	            
                    empty = ''
                    sl = ''
		    ha = ''
	            un = ''
                    ne = ''

		    if (val1 == 1):
	    	    
	                    anger1 = round(jsondata[0]['scores']['anger'])
		            sleepy1 = round(jsondata[0]['scores']['fear'])
		            happy1 = round(jsondata[0]['scores']['happiness'])
		            neutral1 = round(jsondata[0]['scores']['neutral'])
		            unhappy1 = round(jsondata[0]['scores']['sadness'])
		            surprise1 = round(jsondata[0]['scores']['surprise'])
		            sle = sleepy1
	                    hap = happy1 
		            unhap = unhappy1 
		            neu = neutral1
	                    
	                    tot = sle + hap + unhap + neu
	
	                    sl = sle / tot * 100
	                    ha = hap / tot * 100
	                    un = unhap / tot * 100
	                    ne = neu / tot * 100
	                    people = 1

			


                    elif (val1 == 2):

                            anger1 = round(jsondata[0]['scores']['anger'])
		            sleepy1 = round(jsondata[0]['scores']['fear'])
		            happy1 = round(jsondata[0]['scores']['happiness'])
		            neutral1 = round(jsondata[0]['scores']['neutral'])
		            unhappy1 = round(jsondata[0]['scores']['sadness'])
		            surprise1 = round(jsondata[0]['scores']['surprise'])
	    	            anger22 = round(jsondata[1]['scores']['anger'])
		            sleepy22 = round(jsondata[1]['scores']['fear'])
		            happy22 = round(jsondata[1]['scores']['happiness'])
		            neutral22 = round(jsondata[1]['scores']['neutral'])
		            unhappy22 = round(jsondata[1]['scores']['sadness'])
		            surprise22 = round(jsondata[1]['scores']['surprise'])
	                    sle = sleepy1+sleepy22 
	                    hap = happy1+happy22 
		            unhap = unhappy1+unhappy22 
		            neu = neutral1+neutral22 
	                    
	                    tot = sle + hap + unhap + neu
	
	                    sl = sle / tot * 100
	                    ha = hap / tot * 100
	                    un = unhap / tot * 100
	                    ne = neu / tot * 100
                            people = 2



                    elif (val1 == 3):

                            anger1 = round(jsondata[0]['scores']['anger'])
		            sleepy1 = round(jsondata[0]['scores']['fear'])
		            happy1 = round(jsondata[0]['scores']['happiness'])
		            neutral1 = round(jsondata[0]['scores']['neutral'])
		            unhappy1 = round(jsondata[0]['scores']['sadness'])
		            surprise1 = round(jsondata[0]['scores']['surprise'])
	    	            anger22 = round(jsondata[1]['scores']['anger'])
		            sleepy22 = round(jsondata[1]['scores']['fear'])
		            happy22 = round(jsondata[1]['scores']['happiness'])
		            neutral22 = round(jsondata[1]['scores']['neutral'])
		            unhappy22 = round(jsondata[1]['scores']['sadness'])
		            surprise22 = round(jsondata[1]['scores']['surprise'])
                            anger33 = round(jsondata[2]['scores']['anger'])
			    sleepy33 = round(jsondata[2]['scores']['fear'])
			    happy33 = round(jsondata[2]['scores']['happiness'])
			    neutral33 = round(jsondata[2]['scores']['neutral'])
			    unhappy33 = round(jsondata[2]['scores']['sadness'])
		            surprise33 = round(jsondata[2]['scores']['surprise'])
	                    sle = sleepy1+sleepy22+sleepy33
	                    hap = happy1+happy22+happy33
		            unhap = unhappy1+unhappy22+unhappy33
		            neu = neutral1+neutral22+neutral33
	                    people = 3
	                    tot = sle + hap + unhap + neu
	
	                    sl = sle / tot * 100
	                    ha = hap / tot * 100
	                    un = unhap / tot * 100
	                    ne = neu / tot * 100
 
                    elif (val1 == 4):

                            anger1 = round(jsondata[0]['scores']['anger'])
		            sleepy1 = round(jsondata[0]['scores']['fear'])
		            happy1 = round(jsondata[0]['scores']['happiness'])
		            neutral1 = round(jsondata[0]['scores']['neutral'])
		            unhappy1 = round(jsondata[0]['scores']['sadness'])
		            surprise1 = round(jsondata[0]['scores']['surprise'])
	    	            anger22 = round(jsondata[1]['scores']['anger'])
		            sleepy22 = round(jsondata[1]['scores']['fear'])
		            happy22 = round(jsondata[1]['scores']['happiness'])
		            neutral22 = round(jsondata[1]['scores']['neutral'])
		            unhappy22 = round(jsondata[1]['scores']['sadness'])
		            surprise22 = round(jsondata[1]['scores']['surprise'])
                            anger33 = round(jsondata[2]['scores']['anger'])
			    sleepy33 = round(jsondata[2]['scores']['fear'])
			    happy33 = round(jsondata[2]['scores']['happiness'])
			    neutral33 = round(jsondata[2]['scores']['neutral'])
			    unhappy33 = round(jsondata[2]['scores']['sadness'])
		            surprise33 = round(jsondata[2]['scores']['surprise'])
	                    
                            anger44 = round(jsondata[3]['scores']['anger'])
		            sleepy44 = round(jsondata[3]['scores']['fear'])
		            happy44 = round(jsondata[3]['scores']['happiness'])
		            neutral44 = round(jsondata[3]['scores']['neutral'])
		            unhappy44 = round(jsondata[3]['scores']['sadness'])
		            surprise44 = round(jsondata[3]['scores']['surprise'])
	                    sle = sleepy1+sleepy22+sleepy33+sleepy44
	                    hap = happy1+happy22+happy33+happy44
		            unhap = unhappy1+unhappy22+unhappy33+unhappy44
		            neu = neutral1+neutral22+neutral33+neutral44
	                    tot = sle + hap + unhap + neu
	                    people = 4
	                    sl = sle / tot * 100
	                    ha = hap / tot * 100
	                    un = unhap / tot * 100
	                    ne = neu / tot * 100
		
                    elif (val1 == 5):

                            anger1 = round(jsondata[0]['scores']['anger'])
		            sleepy1 = round(jsondata[0]['scores']['fear'])
		            happy1 = round(jsondata[0]['scores']['happiness'])
		            neutral1 = round(jsondata[0]['scores']['neutral'])
		            unhappy1 = round(jsondata[0]['scores']['sadness'])
		            surprise1 = round(jsondata[0]['scores']['surprise'])
	    	            anger22 = round(jsondata[1]['scores']['anger'])
		            sleepy22 = round(jsondata[1]['scores']['fear'])
		            happy22 = round(jsondata[1]['scores']['happiness'])
		            neutral22 = round(jsondata[1]['scores']['neutral'])
		            unhappy22 = round(jsondata[1]['scores']['sadness'])
		            surprise22 = round(jsondata[1]['scores']['surprise'])
                            anger33 = round(jsondata[2]['scores']['anger'])
			    sleepy33 = round(jsondata[2]['scores']['fear'])
			    happy33 = round(jsondata[2]['scores']['happiness'])
			    neutral33 = round(jsondata[2]['scores']['neutral'])
			    unhappy33 = round(jsondata[2]['scores']['sadness'])
		            surprise33 = round(jsondata[2]['scores']['surprise'])
	                    
                            anger44 = round(jsondata[3]['scores']['anger'])
		            sleepy44 = round(jsondata[3]['scores']['fear'])
		            happy44 = round(jsondata[3]['scores']['happiness'])
		            neutral44 = round(jsondata[3]['scores']['neutral'])
		            unhappy44 = round(jsondata[3]['scores']['sadness'])
		            surprise44 = round(jsondata[3]['scores']['surprise'])
                            anger55 = round(jsondata[4]['scores']['anger'])
			    sleepy55 = round(jsondata[4]['scores']['fear'])
			    happy55 = round(jsondata[4]['scores']['happiness'])
			    neutral55 = round(jsondata[4]['scores']['neutral'])
			    unhappy55 = round(jsondata[4]['scores']['sadness'])
		    	    surprise55 = round(jsondata[4]['scores']['surprise'])
	                    sle = sleepy1+sleepy22+sleepy33+sleepy44+sleepy55
	                    hap = happy1+happy22+happy33+happy44+happy55
		            unhap = unhappy1+unhappy22+unhappy33+unhappy44+unhappy55
		            neu = neutral1+neutral22+neutral33+neutral44+neutral55
	                    tot = sle + hap + unhap + neu
	                    people = 5
	                    sl = sle / tot * 100
	                    ha = hap / tot * 100
	                    un = unhap / tot * 100
	                    ne = neu / tot * 100
		    now = datetime.strftime(datetime.now(), "%Y-%m-%dT%H:%M:%S%Z")
		    print(people)
		    # data that we're sending to Power BI REST API
		    data = '[{{ "timestamp": "{0}", "happy": "{1}", "unhappy": "{2}", "neutral": "{3}", "sleepy": "{4}", "people": "{5}" }}]'.format(now, ha, un, ne, sl, people)
		    print(ha)
	            print(un)
	            print(ne)                                 
	            print(sl)
	            print(people)
	            # make HTTP POST request to Power BI REST API
	            req = urllib2.Request(REST_API_URL, data)
	            response = urllib2.urlopen(req)
		    print("POST request to Power BI with data:{0}".format(data))
		    print("Response: HTTP {0} {1}\n".format(response.getcode(), response.read()))	
	

                  

                  














		    time.sleep(240)
	        except urllib2.HTTPError as e:
		    print("HTTP Error: {0} - {1}".format(e.code, e.reason))
	   except urllib2.URLError as e:
		print("URL Error: {0}".format(e.reason))
	   except Exception as e:
		print("General Exception: {0}".format(e))
                   