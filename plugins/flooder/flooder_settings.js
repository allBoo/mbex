
$(function() {
	var pluginId = 'flooder';
	var settingsContainer = $('#plugin_settings_' + pluginId);

	var
    settingsRaw  = '<div><strong>Торговый чат</strong></div>';
	settingsRaw += '<div><label>Тексты сообщения <small>по одному в строке</small><br><textarea style="width: 100%; height: 60px" id="interceptor_message"></textarea><label></div>';
	settingsRaw += '<div><label>Период (минут) <small>не меньше 3х</small> <input type="text" id="interceptor_period" value="3" size="3"></label></div>';
	settingsContainer.html(settingsRaw);

	// links
	var message = $('#interceptor_message');
    var period  = $('#interceptor_period');

	// set current values
    message.attr('value', getSetting('message', ''));
    period.attr('value', getSetting('period', '3'));

	// handlers
    message.blur(function() {
		saveSetting('message', $(this).val());
	});
    period.blur(function() {
        var periodInt = parseInt($(this).val());
        if (isNaN(periodInt) || periodInt <3) {
            period.attr('value', '3');
        }
        saveSetting('period', $(this).val());
    });

	//
	function getSetting(name, def) {
		var settingName = 'plugin_' + pluginId + '_setting_' + name;

		var settingValue = localStorage[settingName] == undefined ? def : localStorage[settingName];
		if (settingValue === 'false') {
			settingValue = false;
		}
		if (settingValue === 'true') {
			settingValue = true;
		}

		return settingValue;
	}

	//
	function saveSetting(name, value) {
		var settingName = 'plugin_' + pluginId + '_setting_' + name;

		localStorage[settingName] = value;

		restartPlugin(pluginId);
	}
});

