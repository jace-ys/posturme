
#include <Wire.h>
#include <Adafruit_MMA8451.h>
#include <Adafruit_Sensor.h>

Adafruit_MMA8451 mma = Adafruit_MMA8451();

const int FLEX_PIN = A0;
const float VCC = 4.98; // Measured voltage of Ardunio 5V line
const float R_DIV = 10600; // Measured resistance of 10k resistor
const float STRAIGHT_RESISTANCE = 10000.0; // resistance when straight
const float BEND_RESISTANCE = 18000.0;


void setup(void) {
  Serial.begin(9600);
  pinMode(FLEX_PIN, INPUT);
  if (! mma.begin()) {
    Serial.println("Couldnt start");
    while (1);
  }
  Serial.println("MMA8451 found!");
  
  mma.setRange(MMA8451_RANGE_2_G);
  
  Serial.print("Range = "); Serial.print(2 << mma.getRange());  
  Serial.println("G");
  
  
}

void loop() {
  mma.read();
  
  int flexADC = analogRead(FLEX_PIN);
  float flexV = flexADC * VCC / 1023.0;
  float flexR = R_DIV * (VCC / flexV - 1.0);
  //float angle = map(flexR, STRAIGHT_RESISTANCE, BEND_RESISTANCE,0, 90.0);
  
  
  //Serial.print(mma.x);
  //Serial.print(" ");
  //Serial.print(mma.z);
  //Serial.print(" ");
  Serial.print(" ");
  //Serial.print('\n');

  if(flexADC > 460){
    Serial.print("0");
    }
  else{
    Serial.print("1");
   }
  Serial.print(" ");

  if (mma.x > 300 || mma.x < -1000){
    Serial.print("0");
  }
  else{
    Serial.print("1");  
  }
  Serial.print(" ");
  
  if (mma.z > 600 || mma.z < -1000){
    Serial.println("0");
  }
  else{
    Serial.println("1");  
  }
  delay(200);
}
