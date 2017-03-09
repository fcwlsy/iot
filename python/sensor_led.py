import json
import urllib2
import serial
import time
import requests

url_led="http://localhost:3000/led"
ser=serial.Serial("/dev/ttyUSB0",9600)

while 1:
   sensor=ser.readline()
   sensor=json.loads(sensor)
   r=requests.post("http://localhost:3000/sensor",data=sensor)
   r.text
   #time.sleep(1)
   data=urllib2.urlopen(url_led)
   status=json.load(data)[0]['status']
   if status:
      ser.write('1')
   else:
      ser.write('0')

   time.sleep(1)

