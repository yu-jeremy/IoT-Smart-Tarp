
var company_title
var photos_btn
var settings_btn
var profile_btn
var toggle_tarp_btn
var retrieve_data_btn
var retrieve_pressure_btn

var photosToCp
var photosToUser
var photosToSettings

var settingsToCp
var settingsToUser
var settingsToPhotos

var userToCp
var userToSettings
var userToPhotos

var photos_div
var settings_div
var home_div
var user_div
var loading_div

var current_page // the current page

function toggleTarp() {
  smartTarp.toggleTarp();
}

function retrievePressure() {
  smartTarp.testPressure();
}

function retrieveEnviroData() {
  smartTarp.retrieveEnviroData();
}

function goToSettings() {
  photos_div.style.display = "none";
  home_div.style.display = "none";
  user_div.style.display = "none";
  settings_div.style.display = "block";
}

function goToUserProfile() {
  home_div.style.display = "none";
  photos_div.style.display = "none";
  settings_div.style.display = "none";
  user_div.style.display = "block";
}

function goToControlPanel() {
  photos_div.style.display = "none";
  user_div.style.display = "none";
  settings_div.style.display = "none";
  home_div.style.display = "block";
}

function goToPhotos() {
  user_div.style.display = "none";
  settings_div.style.display = "none";
  home_div.style.display = "none";
  photos_div.style.display = "block";
}

function goToLoading() {
  user_div.style.display = "none";
  settings_div.style.display = "none";
  home_div.style.display = "none";
  photos_div.style.display = "none";
}

function loadingPage() {
  loading_div.style.display = "none";
  goToControlPanel();
}

function updateState(newState) {
  loadingPage();
  console.log(newState);
  console.log(newState.temperature);
  console.log(newState.humidity);
  document.getElementById("info").innerHTML = newState.tarpState;
  document.getElementById("temp").innerHTML = newState.temperature;
  document.getElementById("humidity").innerHTML = newState.humidity;
  document.getElementById("pressure").innerHTML = newState.pressure;
}

window.addEventListener("load", function() {

  loading_div = document.getElementById("loading_div");

  company_title = document.getElementById("company_title");
  control_panel_btn = document.getElementById("cp_btn");
  photos_btn = document.getElementById("photos_btn");
  settings_btn = document.getElementById("settings_btn");
  profile_btn = document.getElementById("profile_btn");
  toggle_tarp_btn = document.getElementById("toggle_tarp_btn");
  retrieve_data_btn = document.getElementById("retrieve_data_btn");
  retrieve_pressure_btn = document.getElementById("retrieve_pressure_btn");

  photosToCp = document.getElementById("photosToCp");
  photosToUser = document.getElementById("photosToUser");
  photosToSettings = document.getElementById("photosToSettings");

  settingsToCp = document.getElementById("settingsToCp");
  settingsToUser = document.getElementById("settingsToUser");
  settingsToPhotos = document.getElementById("settingsToPhotos");

  userToCp = document.getElementById("userToCp");
  userToSettings = document.getElementById("userToSettings");
  userToPhotos = document.getElementById("userToPhotos");

  home_div = $("#home_div")[0];
  user_div = $("#user_div")[0];
  photos_div = $("#photos_div")[0];
  settings_div = $("#settings_div")[0];

  profile_btn.addEventListener("click", goToUserProfile);
  photos_btn.addEventListener("click", goToPhotos);
  settings_btn.addEventListener("click", goToSettings);
  toggle_tarp_btn.addEventListener("click", toggleTarp);
  retrieve_data_btn.addEventListener("click", retrieveEnviroData);
  retrieve_pressure_btn.addEventListener("click", retrievePressure);

  photosToCp.addEventListener("click", goToControlPanel);
  photosToUser.addEventListener("click", goToUserProfile);
  photosToSettings.addEventListener("click", goToSettings);

  settingsToCp.addEventListener("click", goToControlPanel);
  settingsToUser.addEventListener("click", goToUserProfile);
  settingsToPhotos.addEventListener("click", goToPhotos);

  userToCp.addEventListener("click", goToControlPanel);
  userToSettings.addEventListener("click", goToSettings);
  userToPhotos.addEventListener("click", goToPhotos);

  goToLoading();
  smartTarp.setStateChangeListener(updateState);
  smartTarp.setup();
  current_page = "home";
});
