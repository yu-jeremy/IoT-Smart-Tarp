
var company_title
var settings_btn
var profile_btn
var toggle_tarp_btn
var retrieve_data_btn
var retrieve_pressure_btn
var submit_user_btn

var settingsToCp
var settingsToUser

var userToCp
var userToSettings

var settings_div
var home_div
var user_div
var loading_div

var current_page // the current page

var username
var password

function updateUserInfo() {
  smartTarp.updateUserInfo();
}

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
  current_page = "settings";
  home_div.style.display = "none";
  user_div.style.display = "none";
  settings_div.style.display = "block";
}

function goToUserProfile() {
  current_page = "profile";
  home_div.style.display = "none";
  settings_div.style.display = "none";
  user_div.style.display = "block";
}

function goToControlPanel() {
  current_page = "home";
  user_div.style.display = "none";
  settings_div.style.display = "none";
  home_div.style.display = "block";
}

function goToLoading() {
  user_div.style.display = "none";
  settings_div.style.display = "none";
  home_div.style.display = "none";
}

function loadingPage() {
  console.log(current_page);
  loading_div.style.display = "none";
  if (current_page == "home") {
    goToControlPanel();
  } else if (current_page == "profile") {
    goToUserProfile();
  } else if (current_page == "settings") {
    goToSettings();
  } else {
    // do nothing
  }
}

function updateState(newState) {
  if (newState.pressure == 0) {
    retrievePressure();
  }
  loadingPage();
  console.log(newState);
  console.log(newState.temperature);
  console.log(newState.humidity);
  document.getElementById("info").innerHTML = newState.tarpState;
  document.getElementById("temp").innerHTML = newState.temperature;
  document.getElementById("humidity").innerHTML = newState.humidity;
  document.getElementById("pressure").innerHTML = newState.pressure;
  document.getElementById("status_time").innerHTML = newState.last_status_update_time;
  document.getElementById("temp_time").innerHTML = newState.last_temp_update_time;
  document.getElementById("humidity_time").innerHTML = newState.last_humid_update_time;
  document.getElementById("pressure_time").innerHTML = newState.last_press_update_time;
  username.innerHTML = newState.registered_owner;
  password.innerHTML = newState.owner_pwd;
}

window.addEventListener("load", function() {

  loading_div = document.getElementById("loading_div");

  company_title = document.getElementById("company_title");
  control_panel_btn = document.getElementById("cp_btn");
  settings_btn = document.getElementById("settings_btn");
  profile_btn = document.getElementById("profile_btn");
  toggle_tarp_btn = document.getElementById("toggle_tarp_btn");
  retrieve_data_btn = document.getElementById("retrieve_data_btn");
  retrieve_pressure_btn = document.getElementById("retrieve_pressure_btn");
  submit_user_btn = document.getElementById("submit_user_btn");

  settingsToCp = document.getElementById("settingsToCp");
  settingsToUser = document.getElementById("settingsToUser");

  userToCp = document.getElementById("userToCp");
  userToSettings = document.getElementById("userToSettings");

  username = document.getElementById("username");
  password = document.getElementById("password");

  home_div = $("#home_div")[0];
  user_div = $("#user_div")[0];
  settings_div = $("#settings_div")[0];

  profile_btn.addEventListener("click", goToUserProfile);
  settings_btn.addEventListener("click", goToSettings);
  toggle_tarp_btn.addEventListener("click", toggleTarp);
  retrieve_data_btn.addEventListener("click", retrieveEnviroData);
  retrieve_pressure_btn.addEventListener("click", retrievePressure);
  submit_user_btn.addEventListener("click", updateUserInfo);

  settingsToCp.addEventListener("click", goToControlPanel);
  settingsToUser.addEventListener("click", goToUserProfile);

  userToCp.addEventListener("click", goToControlPanel);
  userToSettings.addEventListener("click", goToSettings);

  goToLoading();
  smartTarp.setStateChangeListener(updateState);
  smartTarp.setup();
  current_page = "home";
});
