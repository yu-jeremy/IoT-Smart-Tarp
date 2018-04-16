/*
 * Project SmartTarp
 * Description:
 * Author:
 * Date:
 */

Servo servo;

// setup() runs once, when the device is first turned on.
void setup() {
  Serial.begin(9600);
  servo.attach(D0);
  servo.write(20);

}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  delay(1000);
}
