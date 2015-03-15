//
var battlePluginActive = false;

//conf
var settingsItems = ['wall', 'wall_level', 'hp', 'hp_level', 'mana', 'mana_level', 'auto', 'auto_list'];
var settings      = {};
var internalState = {
	enemies: {count: 0, current: {name: '', level: 0, hp: {current: 0, max: 0}}},
    hp: {current: 0, max: 0},
    curses: {}
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

    // кол-во врагов в начале
	internalState.enemies.count = $('#mes .B2U').length + $('#mes .B2').length;

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

    // опеределяем противника
    battle_detectCurrentEnemy();

    // уровень жизни
    battle_detectHP();

    // баффы и проклятья
    battle_detectBaffs();

    if (internalState.enemies.current.name.match(/Шут Повелителя/gi)) {
        return false;
    }

	// определяем доступные приемы
	if ($('#priems a').length > 0) {
		var clickPriem = null;
		$('#priems a').each(function(index, item) {
			if (clickPriem) {
				return;
			}

			var click = false;

            // обычные приемы
			if (
                (
                    $(item).find('img[src*=krit_bloodlust]').length
                    || $(item).find('img[src*=krit_wildluck]').length
                    || $(item).find('img[src*=krit_crush]').length
                    || $(item).find('img[src*=counter_deathwalk]').length
                    || $(item).find('img[src*=hp_enrage]').length
                    || $(item).find('img[src*=hp_defence]').length
                    || $(item).find('img[src*=hit_restrike]').length
                ) &&
                    internalState.enemies.current.level > 7
			) {
				click = true;
			}

            // рывок
            if (
                $(item).find('img[src*=blood_gainattack]').length
                && internalState.enemies.current.level > 7
                && !internalState.enemies.current.name.match(/Зомби/gi)
            ) {
                click = true;
            }

            // воля к победе
            if (
                $(item).find('img[src*=hit_willpower]').length
                && internalState.hp.max - internalState.hp.current > 45
            ) {
                click = true;
            }

            // хлебалка
            if (
                $(item).find('img[src*=krit_blooddrink]').length
                && internalState.hp.max - internalState.hp.current > 100
            ) {
                click = true;
            }


            // выжить
			if (
				$(item).find('img[src*=spirit_survive]').length
				&& (
                    (internalState.enemies.count > 1 && ($('#mes .B2U').length + $('#mes .B2').length) == 1)
                    ||
                    ((internalState.enemies.current.name.match(/Древний Страж/gi)
                    || internalState.enemies.current.name.match(/Страж Сокровищ/gi)) &&
                        internalState.enemies.current.hp.current / internalState.enemies.current.hp.max <= 0.07)
                )
			) {
				click = true;
			}

			// шоки и осторожка
            if (
                ($(item).find('img[src*=hit_shock]').length
                || $(item).find('img[src*=multi_hitshock]').length
                || $(item).find('img[src*=counter_ward]').length)
                && (
                    internalState.enemies.current.name.match(/Заблудшая Душа/gi)
                    || internalState.enemies.current.name.match(/Служитель Глубин/gi)
                    || internalState.enemies.current.name.match(/Епископ/gi)
                    || internalState.enemies.current.name.match(/Чернокнижник/gi)
                    || internalState.enemies.current.name.match(/Проклятый Пленник/gi)
                    || internalState.enemies.current.name.match(/Пожиратель Падали/gi)
                    || internalState.enemies.current.name.match(/Древний Страж/gi)
                    || internalState.enemies.current.name.match(/Пылающий Паразит/gi)
                    || internalState.enemies.current.name.match(/Искрящийся Паразит/gi)
                    || internalState.enemies.current.name.match(/Механический Убийца/gi)
                    || internalState.enemies.current.name.match(/Страж Сокровищ/gi)
                    || internalState.enemies.current.name.match(/Мастер Грит/gi)
                )
            ) {
                click = true;
            }

            // очищалка
            if (
                $(item).find('img[src*=hp_cleance]').length
                &&
                (
                    internalState.curses['wis_water_crystalize_bot5']
                    || internalState.curses['wis_water_poison08_bot']
                    || internalState.curses['wis_water_poison07_bot']
                    || internalState.curses['wis_water_poison07_bot1']
                    || internalState.curses['wis_water_poison07_bot2']
                    || internalState.curses['wis_water_poison07_bot3']
                )
            ) {
                click = true;
            }

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

function battle_detectCurrentEnemy() {
    var enemy = $('#f-content font[color=#003388]')[1];
    if (enemy) {
        var enemyName = $(enemy).text();
        var enemyLevel = parseInt(enemyName.match(/\[(\d+)\]/)[1]);
        var enemyHp = $('#f-right-column').find('#HP').text().split('/');

        internalState.enemies.current = {name: enemyName, level: enemyLevel, hp:{current: enemyHp[0], max: enemyHp[1]}};
    }
    else {
        internalState.enemies.current = {name: '', level: 0};
    }
}

function battle_detectHP() {
    var hp = $('#HP').text().split('/');
    internalState.hp.current = parseInt(hp[0]);
    internalState.hp.max     = parseInt(hp[1]);
}


function battle_detectBaffs() {
    internalState.curses = {};
    $('img.prOrEffOnShadow').each(function(i, item) {
        var m = [];
        if ((m = item.src.match(/(wis_water_crystalize_bot\d+)/))
            || (m = item.src.match(/(wis_water_poison\d+_bot\d?)/))
        ) {
            internalState.curses[m[1]] = true;
        }
    });
}
