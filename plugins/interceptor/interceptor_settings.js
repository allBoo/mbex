
$(function() {
	var pluginId = 'interceptor';
	var settingsContainer = $('#plugin_settings_' + pluginId);

	var
	settingsRaw  = '<div><label>Цели перехвата <small>(по одному в строке)</small><br><textarea style="width: 100%; height: 60px" id="interceptor_targets"></textarea><label></div>';
	settingsRaw += '<div><label>Всех светлых <input type="checkbox" id="interceptor_all_targets" value="1"></label></div>';
	settingsRaw += '<div><label>Минимальный уровень <input type="text" id="interceptor_min_level" value="" size="3"></label></div>';
	settingsRaw += '<div><label>Максимальный уровень <input type="text" id="interceptor_max_level" value="" size="3"></label></div>';
	settingsRaw += '<div><label>Только вне боя <input type="checkbox" id="interceptor_battle" value="1"></label></div>';
	settingsRaw += '<div>Локации<br><label><input type="radio" name="interceptor_location" value="all"> Все<label><br><label><input type="radio" name="interceptor_location" value="city"> ЦП / Страш<label></div>';
	settingsContainer.html(settingsRaw);

	// links
	var targets  = $('#interceptor_targets');
	var allTargets  = $('#interceptor_all_targets');
	var minLevel = $('#interceptor_min_level');
	var maxLevel = $('#interceptor_max_level');
	var location = $('input[name=interceptor_location]');
	var battle   = $('#interceptor_battle');

	// set current values
	targets.attr('value', getSetting('targets', ''));
	allTargets.attr('checked', getSetting('all_targets', false));
	minLevel.attr('value', getSetting('min_level', ''));
	maxLevel.attr('value', getSetting('max_level', ''));
	location.each(function() {
		if ($(this).attr('value') == getSetting('location', 'city')) {
			$(this).attr('checked', true);
		}
	});
	battle.attr('checked', getSetting('battle', true));

	if (getSetting('all_targets', false)) {
		targets.attr('disabled', true);
	}
	else {
		minLevel.attr('disabled', true);
		maxLevel.attr('disabled', true);
	}

	// handlers
	targets.blur(function() {
		saveSetting('targets', $(this).val());
	});
	allTargets.click(function() {
		saveSetting('all_targets', $(this).attr('checked'));
		if ($(this).attr('checked')) {
			targets.attr('disabled', true);
			minLevel.attr('disabled',   false);
			maxLevel.attr('disabled',   false);
		}
		else {
			minLevel.attr('disabled', true);
			maxLevel.attr('disabled', true);
			targets.attr('disabled',  false);
		}
	});
	minLevel.blur(function() {
		if (!$(this).val().match(/^\d+$/gi)) {
			$(this).val('');
		}
		if ($(this).val() < 0 || $(this).val() > 11) {
			$(this).val('');
		}
		saveSetting('min_level', $(this).val());
	});
	maxLevel.blur(function() {
		if (!$(this).val().match(/^\d+$/gi)) {
			$(this).val('');
		}
		if ($(this).val() < 0 || $(this).val() > 11) {
			$(this).val('');
		}
		saveSetting('max_level', $(this).val());
	});
	location.click(function() {
		location.each(function() {
			if ($(this).attr('checked')) {
				saveSetting('location', $(this).val());
			}
		});
	});
	battle.click(function() {
		saveSetting('battle', $(this).attr('checked'));
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

