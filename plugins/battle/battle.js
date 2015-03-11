//
var battlePluginActive = false;

//conf
var settingsItems = ['wall', 'wall_level', 'hp', 'hp_level', 'mana', 'mana_level', 'auto', 'auto_list'];
var settings      = {};
var internalState = {
	enemies: {count: 0}
};


//autostart plugin
chrome.extension.sendMessage({type:'getPluginState', pluginId: 'battle', settings: settingsItems}, function(state) {
	if (state.state) {
		startPluginBattle(state.settings);
	}
});
//start/stop by button in settings
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);
	if (request.type === 'startPlugin' && request.pluginId === 'battle' && !battlePluginActive) {
		chrome.extension.sendMessage({type:'getPluginState', pluginId: 'battle', settings: settingsItems}, function(state) {
			if (state.state) {
				startPluginBattle(state.settings);
			}
		});
	}
	if (request.type === 'stopPlugin' && request.pluginId === 'battle' && battlePluginActive) {
		stopPluginBattle();
	}
	if (request.type === 'restartPlugin' && request.pluginId === 'battle' && battlePluginActive) {
		restartPluginBattle();
	}
});

//
function startPluginBattle(aSettings) {
	battlePluginActive = true;

	settings = aSettings;

	console.log('Autobattle start');

	internalState.enemies.count = $('#mes .B2U').length;

	// запускаем бой
	setTimeout(function () {
		battle_simpleLoop();
	}, 500);
}

//
function stopPluginBattle() {
	battlePluginActive = false;
}

//
function restartPluginBattle() {
}

function battle_simpleLoop() {
	console.log('battle loop');
	// определяем доступные приемы
	if ($('#priems a').length > 0) {
		var clickPriem = null;
		$('#priems a').each(function(index, item) {
			if (clickPriem) {
				return;
			}

			var click = false;
			if (
				$(item).find('img[src*=blood_gainattack]').length
				|| $(item).find('img[src*=krit_bloodlust]').length
				|| $(item).find('img[src*=krit_wildluck]').length
				|| $(item).find('img[src*=counter_deathwalk]').length
				|| $(item).find('img[src*=hp_enrage]').length
				|| $(item).find('img[src*=hp_defence]').length
				//|| $(item).find('img[src*=hit_willpower]').length
				|| $(item).find('img[src*=hit_restrike]').length
				//|| $(item).find('img[src*=hit_shock]').length
			) {
				click = true;
			}
			if (
				$(item).find('img[src*=spirit_survive]').length
				&& (internalState.enemies.count > 1 && $('#mes .B2U').length == 1)
			) {
				click = true;
			}
			//

			if (click) {
				clickPriem = item;
			}
			// hit_shock
		});

		if (clickPriem) {
			$(clickPriem)[0].click();
			setTimeout(function () {
				battle_simpleLoop();
			}, 500);

			return;
		}
	}

	//
	if ($('#let_attack').length) {
		if (!$('#let_attack').attr('disabled')) {
			$('#let_attack').click();
		}
		setTimeout(function () {
			battle_simpleLoop();
		}, 500);
		return;
	}
	else if ($('#btn_go_back').length) {
		setTimeout(function () {
			console.log('click go back');
			$('#btn_go_back').click();
		}, 500);
		return;
	}
	else if ($('#reload_fbattle').length) {
		setTimeout(function () {
			console.log('click reload');
			$('#reload_fbattle')[0].click();
		}, 800);
		return;
	}
}
