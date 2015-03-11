
$(function() {
	var pluginId = 'battle';
	var settingsContainer = $('#plugin_settings_' + pluginId);
	//var userInfo = getUser(localStorage['user_id']);

	var
	settingsRaw  = '<div><label>Контроль барьера<input type="checkbox" id="battle_wall" value="1"></label></div>';
	settingsRaw += '<div><label>Минимальный уровень <input type="text" id="battle_wall_level" value="" size="3"></label></div>';
	settingsRaw += '<div><label>Контроль ХП<input type="checkbox" id="battle_hp" value="1"></label></div>';
	settingsRaw += '<div><label>Минимальный уровень <input type="text" id="battle_hp_level" value="" size="3"></label></div>';
	settingsRaw += '<div><label>Контроль маны<input type="checkbox" id="battle_mana" value="1"></label></div>';
	settingsRaw += '<div><label>Минимальный уровень <input type="text" id="battle_mana_level" value="" size="3"></label></div>';

	settingsRaw += '<div><label>Автокаст <small>(при входе в бой)</small><input type="checkbox" id="battle_auto" value="1"></label></div>';
	settingsRaw += '<div id="battle_auto_content"></div>';
	settingsContainer.html(settingsRaw);

	// links
	var wall      = $('#battle_wall');
	var wallLevel = $('#battle_wall_level');
	var hp        = $('#battle_hp');
	var hpLevel   = $('#battle_hp_level');
	var mana      = $('#battle_mana');
	var manaLevel = $('#battle_mana_level');
	var auto      = $('#battle_auto');
	var autoContent = $('#battle_auto_content');

	// set current values
	wall.attr('checked', getSetting('wall', false));
	wallLevel.attr('value', getSetting('wall_level', ''));
	hp.attr('checked', getSetting('hp', false));
	hpLevel.attr('value', getSetting('hp_level', ''));
	mana.attr('checked', getSetting('mana', false));
	manaLevel.attr('value', getSetting('mana_level', ''));
	auto.attr('checked', getSetting('auto', false));

	getSetting('wall', false) ? wallLevel.attr('disabled', false) : wallLevel.attr('disabled', true);
	getSetting('hp', false)   ? hpLevel.attr('disabled', false) : hpLevel.attr('disabled', true);
	getSetting('mana', false) ? manaLevel.attr('disabled', false) : manaLevel.attr('disabled', true);
	getSetting('auto', false) ? showAutoContent() : hideAutoContent();

	// handlers
	wall.click(function() {
		saveSetting('wall', $(this).attr('checked'));
		$(this).attr('checked') ? wallLevel.attr('disabled', false) : wallLevel.attr('disabled', true);
	});
	hp.click(function() {
		saveSetting('hp', $(this).attr('checked'));
		$(this).attr('checked') ? hpLevel.attr('disabled', false) : hpLevel.attr('disabled', true);
	});
	mana.click(function() {
		saveSetting('mana', $(this).attr('checked'));
		$(this).attr('checked') ? manaLevel.attr('disabled', false) : manaLevel.attr('disabled', true);
	});

	var inF = function() {
		if (!$(this).val().match(/^\d+$/gi)) {
			$(this).val('');
		}
		if ($(this).val() < 0) {
			$(this).val('');
		}
		saveSetting($(this).attr('id').replace('battle_', ''), $(this).val());
	};
	$(wallLevel).blur(inF);
	$(hpLevel).blur(inF);
	$(manaLevel).blur(inF);

	// autobattle handlers
	auto.click(function() {
		saveSetting('auto', $(this).attr('checked'));
		if ($(this).attr('checked')) {
			showAutoContent();
		}
		else {
			hideAutoContent();
		}
	});

	//
	var battleAttackFn = function() {
		if (!$(this).val().match(/^\d+$/gi)) {
			$(this).val('');
		}
		if ($(this).val() < 0 || $(this).val() > 5) {
			$(this).val('');
		}

		var autoList = [];
		$('.battle_attack_index').each(function() {
			var attackName = $(this).attr('id').replace('battle_attack_', '');
			var attackIndex = parseInt($(this).val());
			attackIndex = isNaN(attackIndex) ? false : attackIndex;

			if (attackIndex) {
				if (autoList[attackIndex] !== undefined) {
					$(this).val('');
				}
				else {
					autoList[attackIndex] = attackName;
				}
			}
		});

		saveSetting('auto_list', autoList);
	};

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

	//
	function showAutoContent() {
		// загружаем страницу с выбранными приемами
		$.get(localStorage['user_city'] + '/umenie.php', function(data) {
			var autoList = getSetting('auto_list', {});
			var autoListMap = {};
			for (var i in autoList) {
				if (autoList[i]) {
					autoListMap[autoList[i]] = i;
				}
			}

			var attacks  = '';
			if (!data.match(/Выбранные приемы/gi)) {
				attacks = localStorage['attacks_content'] !== undefined ? localStorage['attacks_content'].split(',') : [];
			}
			else {
				attacks = data.match(/<A HREF=\'\/umenie.php\?clear_abil=([^\&]+)\&[^\>]+\>/gi);
				localStorage['attacks_content'] = attacks + "";
			}
			var attacksContent = '<table style="display: inline;" border="0">';
			for (var i = 0; i < attacks.length; i++) {
				var attackName = attacks[i].match(/(\?clear_abil=([^\&]+)\&)/i)[2];

				if (i % 2 == 0) {
					attacksContent += '<tr>';
				}
				attacksContent += '<td><IMG width=40 height=25 src="http://mycombats.org/i/priem/' + attackName + '.gif"></td><td><input type="text" class="battle_attack_index" id="battle_attack_' + attackName + '" value="' + (autoListMap[attackName] ? autoListMap[attackName] : '') + '" size="2"></td>';
				if (i % 2 != 0) {
					attacksContent += '</tr>';
				}
			}
			attacksContent += '</table>';

			autoContent.html(attacksContent);
			autoContent.show();

			$('.battle_attack_index').blur(battleAttackFn);
		});
	}

	//
	function hideAutoContent() {
		autoContent.hide();
	}

	//
	function getUser(id) {
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
});

