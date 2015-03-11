//
var interceptorLocatorPluginActive = false;
var interceptorLocatorReloadTimeout = 1000;
var myLogin = '';
var interceptList = [];
var INTERCEPT_INTERVAL = 15;	// время между нападениями на одного перса

// conf
var settingsItems = ['targets', 'all_targets', 'min_level', 'max_level', 'location', 'battle'];
var settings      = {};
var internalState = {};

// autostart plugin
chrome.extension.sendMessage({type:'getPluginState', pluginId: 'interceptor', settings: settingsItems}, function(state) {
	if (state.state) {
		startPluginInterceptorLocator(state.settings);
	}
});
// start/stop by button in settings
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type === 'startPlugin' && request.pluginId === 'interceptor' && !interceptorLocatorPluginActive) {
		chrome.extension.sendMessage({type:'getPluginState', pluginId: 'interceptor', settings: settingsItems}, function(state) {
			if (state.state) {
				startPluginInterceptorLocator(state.settings);
			}
		});
	}
	if (request.type === 'stopPlugin' && request.pluginId === 'interceptor' && interceptorLocatorPluginActive) {
		stopPluginInterceptorLocator();
	}
	if (request.type === 'restartPlugin' && request.pluginId === 'interceptor' && interceptorLocatorPluginActive) {
		restartPluginInterceptorLocator();
	}
});

//
function startPluginInterceptorLocator(aSettings) {
	interceptorLocatorPluginActive = true;

	settings = aSettings;
	settings.targets = settings.targets.replace("\r", '').split("\n");

	// свой ник
	myLogin = $.cookie('mylogin');

	// определяем локацию
	var location = $('title').html().replace(/\(\d+\)/gi, '');
	internalState.allow_interception = (location == 'Центральная площадь' || location == 'Страшилкина улица' || location == 'Парк развлечений')
		|| (settings.location === 'all' &&
			(location.match(/клуб/gi) || location.match(/улица/gi) || location.match(/зал воинов/gi))
		);
	// если локация не подходящая, увеличиваем интервал обновления
	if (!internalState.allow_interception) {
		interceptorLocatorReloadTimeout = 5000;
	}

	// смотрим всех кто в комнате, определяем на кого можно напасть и свой статус (в бою/не в бою)
	if (internalState.allow_interception) {
		var script = $('td').html().match(/w\(\'([^\<]+)/gi)[0];
		eval(script);
	}

	// если все норм, нападаем
	x();

	// таймаут на обновление фрейма
	setTimeout('reload()', interceptorLocatorReloadTimeout);
}

//
function stopPluginInterceptorLocator() {
	internalState.allow_interception = false;
	interceptorLocatorPluginActive = false;
}

//
function restartPluginInterceptorLocator() {
}

//
function reload() {
	window.location = window.location;
}


//
function w(name, id, align, klan, room, level, slp, trv, deal, battle, name2, afk, dnd, klanwar) {
	// определяем свой статус
	if (name == myLogin) {
		if (parseInt(battle)) {
			internalState.allow_interception = false;
			interceptorLocatorReloadTimeout  = 5000;	// пока в бою, обновляемся раз в 5 сек
		}
	}
	// собираем список потенциальных жертв
	else {
		var allow_interception = false;
		if (settings.all_targets) {
			align = parseFloat(align);
			allow_interception = ((align > 1 && align < 2) || (align == 0.99 ) || (align == 7 && klan != "FreeDealers")) && !parseInt(trv);
			level = parseInt(level);
			if (settings.min_level) {
				allow_interception &= level >= parseInt(settings.min_level);
			}
			if (settings.max_level) {
				allow_interception &= level <= parseInt(settings.max_level);
			}
		}
		else {
			for (var i = 0; i < settings.targets.length; i++) {
				allow_interception = settings.targets[i].toLowerCase() == name.toLowerCase();
				if (allow_interception) {
					break;
				}
			}
		}
		if (settings.battle) {
			allow_interception &= !parseInt(battle);
		}

		if (allow_interception) {
			interceptList.push({'id': id, 'name': name});
		}
	}
}

function x() {
	for (var i = 0; i < interceptList.length; i++) {
		if (!internalState.allow_interception) {
			break;
		}
		tryIntercept(interceptList[i].id, interceptList[i].name);
	}
}

//
function tryIntercept(id, name) {
	console.log("Try Intercept " + name);

	// время с последнего нападения не меньше 15 сек
	var lastIntercept = getLastInterceptionTime(id);
	if (lastIntercept === false || lastIntercept > INTERCEPT_INTERVAL) {
		// запоминаем время нападения
		saveInterceptionDate(id);

		// проверяем уровень ХП
		var userParams = getUser(id);
		// нападаем, если не красный
		if (parseInt(userParams.hp) / parseInt(userParams.maxhp) > 0.33) {
			intercept(id, name, userParams);
		}
	}
}

function intercept(id, name, user) {
	internalState.allow_interception = false;

	// send intercept message
	console.log("Send Intercept " + name);
	chrome.extension.sendMessage({'type': 'intercept', 'id': id, 'name': name, 'user': user}, function(state) {
		console.log('Recieved intercept response ', state);
		// если перехват не активен, обнуляем время нападения, увеличиваем интервал обновления
		if (!state.intercepted) {
			clearInterceptionDate(id);
			interceptorLocatorReloadTimeout = 5000;
		}
	});
}

//
function getUser(id) {
	var userParams = {};

	jQuery.ajax({
		url:     'http://mycombats.org/inf.php?' + id + '&short=1',
		success: function(data) {
			if (data.match(/gamecity_url/i)) {
				var params = data.replace("\r", '').split("\n");
				for (var i = 0; i < params.length; i++) {
					var param = params[i].split('=');
					userParams[param[0]] = param[1];
				}
			}
			else {
				userParams = {hp: 1, maxhp: 1, gamecity_url: 'http://capitalcity.mycombats.org'};
			}
		},
		async:   false
	});

	return userParams;
}

//
function saveInterceptionDate(id) {
	var storedInterceptions = {};
	try {
		storedInterceptions = JSON.parse(localStorage['interceptions']);
	}
	catch(e) {
	}
	if (storedInterceptions == undefined) {
		storedInterceptions = {};
	}
	var now = Math.floor(new Date().getTime() / 1000);
	var newStoredInterceptions = {};
	newStoredInterceptions[id] = Math.floor(new Date().getTime() / 1000);

	// сохраняем данные только за последние 15 сек
	for (var i in storedInterceptions) {
		if (now - storedInterceptions[i] < INTERCEPT_INTERVAL) {
			newStoredInterceptions[i] = storedInterceptions[i];
		}
	}

	localStorage['interceptions'] = JSON.stringify(newStoredInterceptions);
}

//
function clearInterceptionDate(id) {
	var storedInterceptions = {};
	try {
		storedInterceptions = JSON.parse(localStorage['interceptions']);
	}
	catch(e) {
	}
	if (storedInterceptions == undefined) {
		storedInterceptions = {};
	}
	storedInterceptions[id] = 0;

	localStorage['interceptions'] = JSON.stringify(storedInterceptions);
}

//
function getLastInterceptionTime(id) {
	if (localStorage['interceptions'] === undefined) {
		localStorage['interceptions'] = '{}';
	}
	var storedInterceptions = {};
	try {
		storedInterceptions = JSON.parse(localStorage['interceptions']);
	}
	catch(e) {
	}
	if (storedInterceptions == undefined) {
		storedInterceptions = {};
	}
	if (storedInterceptions[id] != undefined) {
		return Math.floor(new Date().getTime() / 1000) - storedInterceptions[id];
	}
	else {
		return false;
	}
}
