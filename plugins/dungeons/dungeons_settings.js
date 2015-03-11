
$(function() {
	var pluginId = 'dungeons';
	var settingsContainer = $('#plugin_settings_' + pluginId);

	var
	settingsRaw  = '<ul>';

	for (var i in dungeon_routes.collection) {
		settingsRaw  += '<li>' + i + '<ul>';
		var current = getSetting('route_' + i, '');
		for (var j in dungeon_routes.collection[i]) {
			var selected = current == j ? ' checked="true" ' : '';
			settingsRaw  += '<li><label><input type="radio" name="' + i + '" value="' + j + '" '+selected+'>' + j + '</label></li>';
		}
		settingsRaw  += '</ul></li>';
	}

	settingsRaw  += '</ul>';
	settingsContainer.html(settingsRaw);

	// links
	var selects      = $('input[type=radio]');

	// handlers
	selects.click(function() {
		console.log('clicked');
		if ($(this).attr('checked')) {
			saveSetting('route_' + $(this).attr('name'), $(this).attr('value'));
		}
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

		if (typeof def == 'object') {
			try {
				settingValue = JSON.parse(settingValue);
			}
			catch(e) {
				settingValue = def;
			}
		}

		return settingValue;
	}

	//
	function saveSetting(name, value) {
		var settingName = 'plugin_' + pluginId + '_setting_' + name;

		if (typeof value == 'object') {
			value = JSON.stringify(value);
		}

		localStorage[settingName] = value;

		restartPlugin(pluginId);
	}
});

