var myParticleAccessToken = "5b02bf49f7ed3f9e77cf282347f13e46913a6aaf"
var mySecondDeviceId = "340046001051363036373538"
var mySecondDeviceId = "510049000351353530373132"
var topic = "cse222/final_proj/tarp/state"

function newTarpEvent(objectContainingData) {
  console.dir(objectContainingData.data);
  var data = JSON.parse(objectContainingData.data);
  smartTarp.tarpState = data.tarpState;
  smartTarp.temperature = Math.round((((data.temperature * 9) / 5) + 32) * 1000) / 1000;
  smartTarp.humidity = Math.round(data.humidity * 100) / 100;
  console.log(data.temperature);
  console.log(data.humidity);
  // then set the global smartTarp object's properties
  smartTarp.stateChange();
}

var smartTarp = {
  tarpState: "Retracted", // retracted, extended, extending, retracting, etc.
  temperature: 0,
  humidity: 0,
  stateChangeListener: null,
  particle: null,
  toggleTarp: function() {
    var functionData = {
      deviceId:mySecondDeviceId,
      name: "toggleTarp",
      argument: "" + this.tarpState,
      auth: myParticleAccessToken
    }
    function onSuccess(e) { console.log("toggleTarp call success")}
    function onFailure(e) {
      console.log("toggleTarp call failed")
      console.dir(e)
    }
    particle.callFunction(functionData).then(onSuccess, onFailure);
  },

  retrieveEnviroData: function() {
    var functionData = {
      deviceId:mySecondDeviceId,
      name: "queryEnviro",
      argument: "",
      auth: myParticleAccessToken
    }
    function onSuccess(e) { console.log("queryEnviro call success")}
    function onFailure(e) {
      console.log("queryEnviro call failed")
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
        tarpState: this.tarpState,
        temperature: this.temperature,
        humidity: this.humidity
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
           deviceId:mySecondDeviceId,
           name: "publishData",
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
