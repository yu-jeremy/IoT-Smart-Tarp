/*
 * Project SmartTarp
 * Description: A Smart Tarp!
 * Author: Jeremy Yu
 * Date: 4/23/18
 */

// include the library for the temperature sensor
#include "../lib/Adafruit_AM2315/src/Adafruit_AM2315/Adafruit_AM2315.h"

Adafruit_AM2315 sensor = Adafruit_AM2315();

// servo object
Servo servo;

// antenna line
STARTUP(WiFi.selectAntenna(ANT_AUTO));

// topic we will publish to
const String topic = "cse222/final_proj/tarp/state";

String tarpState;
float temperature;
float humidity;
float pressureValue;

enum State {
  retracted,
  extended,
  retracting,
  extending
};

State state = retracted;

Timer extend(6500, stopExtending, true);
Timer retract(6000, stopRetracting, true);

// setup() runs once, when the device is first turned on.
void setup() {
  Serial.begin(9600);
  pinMode(A4, INPUT);
  servo.attach(D2);

  sensor.begin();

  tarpState = "Retracted";
  temperature = sensor.readTemperature();
  humidity = sensor.readHumidity();

  Particle.function("queryEnviro", queryEnviro);
  Particle.function("publishData", publishData);
  Particle.function("toggleTarp", toggleTarp);
  Particle.function("testPressure", testPressure);
  Particle.variable("tarpState", tarpState);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  Serial.println(analogRead(A4));
  delay(1000);
}

void stopRetracting() {
  servo.detach();
  tarpState = "Retracted";
  state = retracted;
  publishData("");
}

void stopExtending() {
  servo.detach();
  tarpState = "Extended";
  state = extended;
  publishData("");
}

int testPressure(String args) {
  pressureValue = analogRead(A4);
  publishData("");
  return 0;
}

int queryEnviro(String args) {
  temperature = sensor.readTemperature();
  humidity = sensor.readHumidity();
  publishData("");
  return 0;
}

int toggleTarp(String args) {
  servo.attach(D2);
  if (state == retracted) {
    tarpState = "Extending";
    state = extending;
    servo.write(0);
    extend.start();
  } else if (state == extended) {
    tarpState = "Retracting";
    state = retracting;
    servo.write(180);
    retract.start();
  } else {
    // do nothing
  }

  publishData("");
  return 0;
}

int publishData(String args) {
  String data = "{";
  data += "\"tarpState\":";
  data += "\"";
  data += tarpState;
  data += "\"";
  data += ", ";
  data += "\"temperature\":";
  data += String(temperature);
  data += ", ";
  data += "\"humidity\":";
  data += String(humidity);
  data += ", ";
  data += "\"pressure\":";
  data += String(pressureValue);
  data += "}";

  Serial.println("Publishing:");
  Serial.println(data);

  Particle.publish(topic, data, 60, PRIVATE);
  return 0;
}
