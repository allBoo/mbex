// Background page: background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type === 'showPageAction') {
		localStorage['user_id'] = request.user.id;
		localStorage['user_name'] = request.user.name;
		localStorage['user_city'] = request.user.gamecity_url;

		var tab = sender.tab;
		chrome.pageAction.show(tab.id);
		chrome.pageAction.setPopup({tabId: tab.id, popup: "popup.html"});
	}

	if (request.type === 'getPluginState') {
		var state    = localStorage['plugin_' + request.pluginId] === '1';
		var settings = {};
		if (request.settings !== undefined) {
			for (var i = 0; i < request.settings.length; i++) {
				settings[request.settings[i]] = getSetting(request.pluginId, request.settings[i]);
			}
		}
		sendResponse({'state': state, 'settings': settings});
	}

	if (request.type === 'getPluginSetting') {
		var settingName = 'plugin_' + request.pluginId + '_setting_' + request.name;

		var settingValue = localStorage[settingName] == undefined ? request.def : localStorage[settingName];
		if (settingValue === 'false') {
			settingValue = false;
		}
		if (settingValue === 'true') {
			settingValue = true;
		}

		sendResponse(settingValue);
	}

	if (request.type === 'intercept') {
		console.log('Recieved intercept request in BG');
		// redirect message to CS
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
				sendResponse(response);
			});
		});

		return true;
	}
});


//
function getSetting(pluginId, name) {
	var settingName = 'plugin_' + pluginId + '_setting_' + name;

	var settingValue = localStorage[settingName] == undefined ? '' : localStorage[settingName];
	if (settingValue === 'false') {
		settingValue = false;
	}
	if (settingValue === 'true') {
		settingValue = true;
	}

	return settingValue;
}
