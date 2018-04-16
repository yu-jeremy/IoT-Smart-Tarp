
var company_title;
var control_panel_btn
var photos_btn
var settings_btn

var photos_div
var settings_div
var home_div
var user_div


function goToSettings() {
  photos_div.hide();
  home_div.hide();
  user_div.hide();
}

function goToUserProfile() {
  home_div.hide();
  photos_div.hide();
  settings_div.hide();
}

function goToControlPanel() {
  photos_div.hide();
  user_div.hide();
  settings_div.hide();
}

function goToPhotos() {
  user_div.hide();
  settings_div.hide();
  home.hide();
}

$(window).on('load', function() {
  company_title = $("#company_title")[0];
  control_panel_btn = $("#cp_btn")[0];
  photos_btn = $("#photos_btn")[0];
  settings_btn = $("#settings_btn")[0];

  home_div = $("#home_div")[0];
  user_div = $("#user_div")[0];
  photos_div = $("#photos_div")[0];
  settings_div = $("#settings_div")[0];




  control_panel_btn.on('click', function() {
    goToControlPanel();
  })

  
});
