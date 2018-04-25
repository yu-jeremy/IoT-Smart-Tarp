
var company_title
var settings_btn
var profile_btn
var toggle_tarp_btn
var retrieve_data_btn
var retrieve_pressure_btn
var submit_user_btn
var login_btn
var logout_btn
var submit_system_btn

var settingsToCp
var settingsToUser

var userToCp
var userToSettings

var settings_div
var home_div
var user_div
var loading_div
var login_div
var nav

var current_page // the current page

var username
var password

var current_user
var current_pwd
var login_user
var login_pwd
var greet_user

var welcome_alert

function changeSystem() {
  var s = "";
  if (document.getElementById("system").value == "Celsius") {
    s = "Ce";
  } else {
    s = "Fa";
  }
  smartTarp.changeSystem(s);
}

function updateUserInfo() {
  smartTarp.updateUserInfo(username.value, password.value);
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
  nav.style.display = "block";
  home_div.style.display = "none";
  user_div.style.display = "none";
  welcome_alert.style.display = "none";
  settings_div.style.display = "block";
}

function goToUserProfile() {
  current_page = "profile";
  nav.style.display = "block";
  home_div.style.display = "none";
  settings_div.style.display = "none";
  welcome_alert.style.display = "none";
  user_div.style.display = "block";
}

function goToControlPanel() {
  current_page = "home";
  nav.style.display = "block";
  welcome_alert.style.display = "block";
  user_div.style.display = "none";
  settings_div.style.display = "none";
  login_div.style.display = "none";
  home_div.style.display = "block";
}

function goToLoading() {
  current_page = "loading";
  user_div.style.display = "none";
  settings_div.style.display = "none";
  home_div.style.display = "none";
  nav.style.display = "none";
  login_div.style.display = "none";
}

function goToLogin() {
  current_page = "login";
  login_div.style.display = "block";
  nav.style.display = "none";
  user_div.style.display = "none";
  settings_div.style.display = "none";
  home_div.style.display = "none";
  loading_div.style.display = "none";
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
  } else if (current_page == "login") {
    goToLogin();
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
  document.getElementById("humidity").innerHTML = newState.humidity;
  document.getElementById("pressure").innerHTML = newState.pressure;
  document.getElementById("status_time").innerHTML = newState.last_status_update_time;
  document.getElementById("temp_time").innerHTML = newState.last_temp_update_time;
  document.getElementById("humidity_time").innerHTML = newState.last_humid_update_time;
  document.getElementById("pressure_time").innerHTML = newState.last_press_update_time;
  current_user.value = newState.user;
  current_pwd.value = newState.pwd;
  greet_user.innerHTML = newState.user;


  if (newState.system == "Fa") {
    document.getElementById("temp").innerHTML = Math.round((((newState.temperature * 9) / 5) + 32) * 1000) / 1000;
    document.getElementById("symbol").innerHTML = "&#8457;"
    document.getElementById("system").value = "Fahrenheit";
  } else if (newState.system == "Ce"){
    document.getElementById("temp").innerHTML = newState.temperature;
    document.getElementById("symbol").innerHTML = "&#8451;"
    document.getElementById("system").value = "Celsius";
  }
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
  login_btn = document.getElementById("login_btn");
  logout_btn = document.getElementById("logout_btn");
  submit_system_btn = document.getElementById("submit_system_btn");

  settingsToCp = document.getElementById("settingsToCp");
  settingsToUser = document.getElementById("settingsToUser");

  userToCp = document.getElementById("userToCp");
  userToSettings = document.getElementById("userToSettings");

  username = document.getElementById("username");
  password = document.getElementById("password");

  current_user = document.getElementById("current_user");
  current_pwd = document.getElementById("current_pwd");
  login_user = document.getElementById("login_user");
  login_pwd = document.getElementById("login_pwd");
  greet_user = document.getElementById("hello_user");

  home_div = $("#home_div")[0];
  user_div = $("#user_div")[0];
  settings_div = $("#settings_div")[0];
  login_div = $("#login_div")[0];
  nav = $("#nav")[0];

  welcome_alert = document.getElementById("welcome_alert");

  profile_btn.addEventListener("click", goToUserProfile);
  settings_btn.addEventListener("click", goToSettings);
  toggle_tarp_btn.addEventListener("click", toggleTarp);
  retrieve_data_btn.addEventListener("click", retrieveEnviroData);
  retrieve_pressure_btn.addEventListener("click", retrievePressure);
  submit_user_btn.addEventListener("click", updateUserInfo);
  login_btn.addEventListener("click", goToControlPanel);
  logout_btn.addEventListener("click", goToLogin);
  submit_system_btn.addEventListener("click", changeSystem);

  settingsToCp.addEventListener("click", goToControlPanel);
  settingsToUser.addEventListener("click", goToUserProfile);

  userToCp.addEventListener("click", goToControlPanel);
  userToSettings.addEventListener("click", goToSettings);

  goToLoading();
  smartTarp.setStateChangeListener(updateState);
  smartTarp.setup();
  current_page = "login";
});
