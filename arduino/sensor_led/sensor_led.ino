#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
int ledPort=13;//Led灯的正极连接到13端口
int serialData;
void setup(void)
{
  Serial.begin(9600);
  sensors.begin();
  pinMode(ledPort,OUTPUT);
}

void loop(void)
{
  String inString="";
  while (Serial.available()>0) {
      int inChar=Serial.read();
      if (isDigit(inChar)){
          inString+=(char)inChar;
        }
      serialData=inString.toInt();
    }
    if (serialData==1){
        digitalWrite(ledPort,HIGH);
    }else{
      digitalWrite(ledPort,LOW);      
    }
  sensors.requestTemperatures(); // Send the command to get temperature
  Serial.print("{\"temperature\":");
  Serial.print(sensors.getTempCByIndex(0));
  Serial.println("}");
  delay(1000);//每隔1秒获得一次传感器的数据
}
