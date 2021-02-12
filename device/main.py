import serial
from time import sleep
import requests

ARD_PORT = "/dev/ttyUSB0"
DEVICE_ID = 1234
URL = "http://localhost:3000/device"

si = serial.Serial(ARD_PORT,baudrate=9600,timeout=1)

def parseData(rawData):
  rawDataStripped = rawData.strip()
  finalData = rawDataStripped.split("@")
  parsedData = {}
  parsedData["device_id"]=DEVICE_ID
  parsedData["temperature"]=finalData[0]
  parsedData["humidity"]=finalData[1]
  parsedData["pressure"]=finalData[2]
  parsedData["altitude"]=finalData[3]
  return parsedData

def main():
  while True:
    data = si.readline().decode('ascii')
    if data.rstrip()!="":
      finalData = parseData(data)
      requests.post(url=URL, data=finalData)
      print(finalData)


if __name__ == "__main__":
  main()
