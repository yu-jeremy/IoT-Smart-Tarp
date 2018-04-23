/*
 * Project SmartTarp
 * Description: A Smart Tarp!
 * Author: Jeremy Yu
 * Date: 4/23/18
 */

// servo object
Servo servo;

// antenna line
STARTUP(WiFi.selectAntenna(ANT_AUTO));

// topic we will publish to
const String topic = "cse222/final_proj/tarp/state";

String tarpState;

enum State {
  retracted,
  extended,
  retracting,
  extending
};

State state = retracted;

// setup() runs once, when the device is first turned on.
void setup() {
  Serial.begin(9600);
  servo.attach(D0);
  servo.write(20);

  Particle.function("publishData", publishData);
  Particle.function("toggleTarp", toggleTarp);
  Particle.variable("tarpState", tarpState);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  delay(1000);
}

int toggleTarp(String args) {
  if (state == retracted) {
    tarpState = "Extending";
  } else if (state == extended) {
    tarpState = "Retracting";
  }
  publishData("");
}

int publishData(String args) {
  String data = "{";
  data += "\"tarpState\":";
  data += "\"";
  data += tarpState;
  data += "}";

  Serial.println("Publishing:");
  Serial.println(data);

  Particle.publish(topic, data, 60, PRIVATE);
  return 0;
}
