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

enum State {
  retracted,
  extended,
  retracting,
  extending
};

State state = retracted;

Timer retractAndextend(5000, stopRotating, true);

// setup() runs once, when the device is first turned on.
void setup() {
  Serial.begin(9600);
  servo.attach(D2);

  sensor.begin();

  tarpState = "Retracted";
  temperature = sensor.readTemperature();
  humidity = sensor.readHumidity();

  Particle.function("queryEnviro", queryEnviro);
  Particle.function("publishData", publishData);
  Particle.function("toggleTarp", toggleTarp);
  Particle.variable("tarpState", tarpState);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  delay(1000);
}

void stopRotating() {
  servo.detach();
  if (tarpState == "Extending") {
    tarpState = "Extended";
    state = extended;
  } else if (tarpState == "Retracting") {
    tarpState = "Retracted";
    state = retracted;
  }
  publishData("");
}

int queryEnviro(String args) {
  temperature = sensor.readTemperature();
  humidity = sensor.readHumidity();
  publishData("");
}

int toggleTarp(String args) {
  servo.attach(D2);
  if (state == retracted) {
    tarpState = "Extending";
    state = extending;
    servo.write(180);
    retractAndextend.start();
  } else if (state == extended) {
    tarpState = "Retracting";
    servo.write(0);
    retractAndextend.start();
    state = retracting;
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
  data += "}";

  Serial.println("Publishing:");
  Serial.println(data);

  Particle.publish(topic, data, 60, PRIVATE);
  return 0;
}
