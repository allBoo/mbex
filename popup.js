var BG = chrome.extension.getBackgroundPage();

var pluginsContainer = $('#plugins');
var pluginsSettingsLoaded = {};

for (var pluginId in mbkPluginsList) {
	pluginInfo = mbkPluginsList[pluginId];
	pluginHtmlRow  = '<li class="menu-entry" id="plugin_container_' + pluginId + '"><input type="checkbox" id="plugin_switcher_' + pluginId + '"> ' + pluginInfo.name + '</li>';
	pluginHtmlRow += '<li class="menu-entry-settings" id="plugin_settings_' + pluginId + '" class="menu-settings"></li>';
	pluginsContainer.append(pluginHtmlRow);

	if (localStorage['plugin_' + pluginId] === '1') {
		activatePlugin(pluginId);
		if (pluginInfo.settings == true) {
			showPluginSettings(pluginId);
		}
	}
}

//
function activatePlugin(pluginId) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {'type': 'startPlugin', 'pluginId': pluginId}, function(response) {});
	});

	$('#plugin_switcher_' + pluginId).attr('checked', true);
}

//
function deactivatePlugin(pluginId) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {'type': 'stopPlugin', 'pluginId': pluginId}, function(response) {});
	});

	$('#plugin_switcher_' + pluginId).attr('checked', false);
}

//
function restartPlugin(pluginId) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {'type': 'restartPlugin', 'pluginId': pluginId}, function(response) {});
	});
}

//
function hidePluginSettings(pluginId)
{
	$('#plugin_settings_' + pluginId).hide();
}

//
function showPluginSettings(pluginId)
{
	if (pluginsSettingsLoaded[pluginId] !== true) {
		pluginsSettingsLoaded[pluginId] = true;

		loadPluginSettingsJs(pluginId);
	}

	$('#plugin_settings_' + pluginId).show();
}

//
function loadPluginSettingsJs(pluginId) {
	var script = document.createElement('script');
	script.src = 'plugins/' + pluginId + '/' + pluginId + '_settings.js';
	document.head.appendChild(script);
}

// Click handlers
$(function() {
	$(".menu-entry").click(function() {
		var pluginId = $(this).attr('id').replace('plugin_container_', '');
		var pluginStatus = localStorage['plugin_' + pluginId];

		if (pluginStatus === '1') {
			localStorage['plugin_' + pluginId] = '0';
			deactivatePlugin(pluginId);
			if (mbkPluginsList[pluginId].settings == true) {
				hidePluginSettings(pluginId);
			}
		}
		else {
			localStorage['plugin_' + pluginId] = '1';
			activatePlugin(pluginId);
			if (mbkPluginsList[pluginId].settings == true) {
				showPluginSettings(pluginId);
			}
		}
	});
	//var checked = $(this).is(":checked");
});


// custom functions

//
function getUser() {
	var id = $.cookie('battle');
	var userParams = {};

	jQuery.ajax({
		url:     'http://mycombats.org/inf.php?' + id + '&short=1',
		success: function(data) {
			var params = data.replace("\r", '').split("\n");
			for (var i = 0; i < params.length; i++) {
				var param = params[i].split('=');
				userParams[param[0]] = param[1];
			}
		},
		async:   false
	});

	return userParams;
}

