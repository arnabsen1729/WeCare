//Air pressure detection
#include "Seeed_BMP280.h"
#include "DHT.h"
#include <Arduino.h>
#include <Wire.h>
#include <U8x8lib.h>

U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(/* reset=*/ U8X8_PIN_NONE);
BMP280 bmp280;
#define DHTPIN 3     // what pin we're connected to
#define DHTTYPE DHT11   // DHT 11 
DHT dht(DHTPIN, DHTTYPE);
 
void setup() {
    Serial.begin(9600);
    if (!bmp280.init()) {
        Serial.println("Device not connected or broken!");
    }
    dht.begin();
    u8x8.begin();
    u8x8.setPowerSave(0);  
    u8x8.setFlipMode(1);
}

void LEDDisplay(float temp, float humidity, float airPressure, float altitude){
  u8x8.setFont(u8x8_font_chroma48medium8_r);
  u8x8.setCursor(0, 0);
  u8x8.print("Temp:");
  u8x8.print(temp);
  u8x8.print("C");
  u8x8.setCursor(0,33);
  u8x8.print("Humi:");
  u8x8.print(humidity);
  u8x8.print("%");
  u8x8.setCursor(0,50);
//  u8x8.print(airPressure);
//  u8x8.print("Pa");
//  u8x8.setCursor(0,80);
  u8x8.print("Alt: ");
  u8x8.print(altitude);
  u8x8.print("m");
  
  u8x8.refreshDisplay();
}

void SerialPrint(float temp, float humidity, float airPressure, float altitude){
  Serial.print("Temp: ");
  Serial.print(temp);
  Serial.println("C");

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");

  Serial.print("Pressure: ");
  Serial.print(airPressure);
  Serial.println("Pa");

  Serial.print("Altiude: ");
  Serial.print(altitude);
  Serial.println("m");

  Serial.println("\n");
}


void SerialOut(float temp, float humidity, float airPressure, float altitude){
  Serial.print(temp);
  Serial.print("@");
  Serial.print(humidity);
  Serial.print("@");
  Serial.print(airPressure);
  Serial.print("@");
  Serial.print(altitude);
  Serial.println("\n");
}
 
void loop() {
 
    float temp, humidity, pressure, altitude;

    //get temp
    temp = bmp280.getTemperature();

    //get humidity
    humidity = dht.readHumidity();
    
    //get atmospheric pressure data
    pressure = bmp280.getPressure();
 
    //get altitude data
    altitude = bmp280.calcAltitude(pressure);

    LEDDisplay(temp, humidity, pressure, altitude);
    SerialOut(temp, humidity, pressure, altitude);
    //SerialPrint(temp, humidity, pressure, altitude);
 
    delay(2000);
}
