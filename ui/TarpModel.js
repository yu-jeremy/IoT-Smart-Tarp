var myParticleAccessToken = "5b02bf49f7ed3f9e77cf282347f13e46913a6aaf"
var myDeviceId = "340046001051363036373538"
var mySecondDeviceId = "510049000351353530373132"
var topic = "cse222/final_proj/tarp/state"

function newTarpEvent(objectContainingData) {
  console.dir(objectContainingData.data);
  var data = JSON.parse(objectContainingData.data);
  smartTarp.tarpState = data.tarpState;
  // then set the global smartTarp object's properties
  smartTarp.stateChange();
}

var smartTarp = {
  tarpState: "Retracted", // retracted, extended, extending, retracting, etc.
  stateChangeListener: null,
  particle: null,
  toggleTarp: function() {
    var functionData = {
      deviceId: myDeviceId,
      name: "toggleTarp",
      argument: "" + this.tarpState,
      auth: myParticleAccessToken
    }
    function onSuccess(e) { console.log("toggleTarp call success")}
    function onFailure(e) {
      console.log("toggleTarp call failed" )
      console.dir(e)
    }
    particle.callFunction(functionData).then(onSuccess, onFailure);
  },

  setStateChangeListener: function(listener) {
    this.stateChangeListener = listener;
  },

  stateChange: function() {
    if (this.stateChangeListener) {
      var state = {
        tarpState: this.tarpState
      }
      this.stateChangeListener(state);
    }
  },

  setup: function() {
    particle = new Particle();
    // subscribe to the stream here
    function onSuccess(stream) {
      console.log("getEventStream success");
      stream.on('event', newTarpEvent);
      var publishingData = {
           deviceId:myDeviceId,
           name: "publishState",
           argument: "",
           auth: myParticleAccessToken
      }
      particle.callFunction(publishingData);
    }
    function onFailure(e) {
      console.log("getEventStream call failed");
      console.dir(e)
    }
    // finally subscribe to the stream here and the promise reacts accordingly
    particle.getEventStream( { name: topic, auth: myParticleAccessToken }).then(onSuccess, onFailure)
  }
}
