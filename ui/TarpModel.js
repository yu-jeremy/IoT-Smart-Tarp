var myParticleAccessToken = "5b02bf49f7ed3f9e77cf282347f13e46913a6aaf"
var myDeviceId = "340046001051363036373538"
var mySecondDeviceId = "510049000351353530373132"
var topic = "cse222/final_proj/tarp/state"

function newTarpEvent(objectContainingData) {
  console.dir(objectContainingData.data);
  var data = JSON.parse(objectContainingData.data);
  smartTarp.doorState = data.tarpState;
  smartTarp.doorAutoClose = data.doorAutoClose;

  // then set the global smartTarp object's properties
  smartTarp.stateChange();
}


var smartTarp = {
  tarpState = "Retracted", // retracted, extended, extending, retracting, etc.


}
