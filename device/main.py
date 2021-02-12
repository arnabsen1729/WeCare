import serial
from time import sleep

ARD_PORT = "/dev/ttyUSB0"


si = serial.Serial(ARD_PORT,baudrate=9600,timeout=1)

def parseData(rawData):
  rawDataStripped = rawData.strip()
  finalData = rawDataStripped.split("@")
  parsedData = {}
  parsedData["temp"]=finalData[0]
  parsedData["humi"]=finalData[1]
  parsedData["pressure"]=finalData[2]
  parsedData["alt"]=finalData[3]
  return parsedData


def main():
  while True:
    data = si.readline().decode('ascii')
    if data.rstrip()!="":
      finalData = parseData(data)
      print(finalData)


if __name__ == "__main__":
  main()
