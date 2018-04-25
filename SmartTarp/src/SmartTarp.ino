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

// Wifi antenna
STARTUP(WiFi.selectAntenna(ANT_AUTO));

// topic we will publish to
const String topic = "cse222/final_proj/tarp/state";

String user;
String pwd;
String tarpState;
float temperature;
float humidity;
float pressureValue;
const int PRESSURE_COUNTS = 7;

int status_update_time;
int temp_update_time;
int humidity_update_time;
int pressure_update_time;

float pressures[PRESSURE_COUNTS];
int count = 0;

enum State {
  retracted,
  extended,
  retracting,
  extending
};

State state = retracted;

Timer extend(6500, stopExtending, true);
Timer retract(6000, stopRetracting, true);

Timer status_timer(10000, updateStatusTime);
Timer enviro_timer(10000, updateEnviroTime);
Timer press_timer(10000, updatePressureTime);

// setup() runs once, when the device is first turned on.
void setup() {
  Serial.begin(9600);
  pinMode(A4, INPUT);
  servo.attach(D2);

  sensor.begin();

  tarpState = "Retracted";
  temperature = sensor.readTemperature();
  humidity = sensor.readHumidity();

  status_update_time = 0;
  temp_update_time = 0;
  humidity_update_time = 0;
  pressure_update_time = 0;

  Particle.function("updateUser", updateUser);
  Particle.function("queryEnviro", queryEnviro);
  Particle.function("publishData", publishData);
  Particle.function("toggleTarp", toggleTarp);
  Particle.function("testPressure", testPressure);
  Particle.variable("tarpState", tarpState);
  Particle.variable("username", user);
  Particle.variable("password", pwd);

  status_timer.start();
  enviro_timer.start();
  press_timer.start();
}

void loop() {
  calculateVoltage();
  for (int i = 0; i < PRESSURE_COUNTS; i++) {
    Serial.print(pressures[i]);
    Serial.print(',');
  }
  Serial.println();
  delay(1000);
}

void updateStatusTime() {
  status_update_time += 10;
  publishData("");
}

void updateEnviroTime() {
  temp_update_time += 10;
  humidity_update_time += 10;
  publishData("");
}

void updatePressureTime() {
  pressure_update_time += 10;
  publishData("");
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

void calculateVoltage() {
  float analogVal = analogRead(A4);
  float resolution = 1000 * 3.3 / 4095.0;
  float voltage = analogVal * resolution;
  pressures[count % PRESSURE_COUNTS] = voltage; // in mV
  count += 1;
}

int updateUser(String args) {
  int indexOfComma = args.indexOf(',');
  String username = args.substring(0,indexOfComma);
  String password = args.substring(indexOfComma+1);
  user = username;
  pwd = password;
  publishData("");
  return 0;
}

int testPressure(String args) {
  float mean = (pressures[0] + pressures[1] + pressures[2] + pressures[3] + pressures[4]
    + pressures[5] + pressures[6]) / PRESSURE_COUNTS;
  pressureValue = mean;
  pressure_update_time = 0;
  press_timer.reset();
  publishData("");
  return 0;
}

int queryEnviro(String args) {
  temperature = sensor.readTemperature();
  humidity = sensor.readHumidity();
  temp_update_time = 0;
  humidity_update_time = 0;
  enviro_timer.reset();
  publishData("");
  return 0;
}

int toggleTarp(String args) {
  servo.attach(D2);
  status_update_time = 0;
  status_timer.reset();
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
  data += ", ";
  data += "\"last_status_update_time\":";
  data += String(status_update_time);
  data += ", ";
  data += "\"last_temp_update_time\":";
  data += String(temp_update_time);
  data += ", ";
  data += "\"last_humid_update_time\":";
  data += String(humidity_update_time);
  data += ", ";
  data += "\"last_press_update_time\":";
  data += String(pressure_update_time);
  data += ", ";
  data += "\"registered_owner\":";
  data += "\"";
  data += user;
  data += "\"";
  data += ", ";
  data += "\"owner_pwd\":";
  data += "\"";
  data += pwd;
  data += "\"";
  data += "}";
  // data += ", ";
  // data += "\"owner_pwd\":";
  // data += "\"";
  // data += pwd;
  // data += "\"";
  // data += "}";

  Serial.println("Publishing:");
  Serial.println(data);

  Particle.publish(topic, data, 60, PRIVATE);
  return 0;
}
