//
var interceptorPluginActive = false;

//conf
var settingsItems = ['targets', 'all_targets', 'min_level', 'max_level', 'location', 'battle'];
var settings      = {};
var internalState = {button: false, attack: false, blood_attack: false};


//autostart plugin
chrome.extension.sendMessage({type:'getPluginState', pluginId: 'interceptor', settings: settingsItems}, function(state) {
	if (state.state) {
		startPluginInterceptor(state.settings);
	}
});
//start/stop by button in settings
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type === 'startPlugin' && request.pluginId === 'interceptor' && !interceptorPluginActive) {
		chrome.extension.sendMessage({type:'getPluginState', pluginId: 'interceptor', settings: settingsItems}, function(state) {
			if (state.state) {
				startPluginInterceptor(state.settings);
			}
		});
	}
	if (request.type === 'stopPlugin' && request.pluginId === 'interceptor' && interceptorPluginActive) {
		stopPluginInterceptor();
	}
	if (request.type === 'restartPlugin' && request.pluginId === 'interceptor' && interceptorPluginActive) {
		restartPluginInterceptor();
	}

	if (request.type === 'intercept') {
		if (interceptorPluginActive && intercept(request.id, request.name, request.user)) {
			sendResponse({intercepted: true});
		}
		else {
			sendResponse({intercepted: false});
		}
	}
});

//buttons_on_image

//
function startPluginInterceptor(aSettings) {
	interceptorPluginActive = true;

	settings = aSettings;

	// определяем как можем нападать
	checkInterceptType();
	// если можем нападать, показываем форму
	if (interceptorPluginActive) {
		showInterceptForm();
	}
}

//
function stopPluginInterceptor() {
	interceptorPluginActive = false;
	hideInterceptForm();
}

//
function restartPluginInterceptor() {
}

//
function intercept(id, name, user) {
	console.log('Recieved intercept request ' + name);
	localStorage['intercepted_name'] = name;
	$('#interceptLogin').val(name);
	$('#interceptForm').submit();
	return true;
}

//
function checkInterceptType() {
	// доступность кнопки "Напасть"
	if ($('#buttons_on_image span').text().match(/форум/gi)) {
		internalState.button = true;
	}
	// TODO другие способы
	else if (settings.location === 'all') {
	}

	// если вариантов нет, отключаемся
	if (!internalState.button) {
		stopPluginInterceptor();
	}
}

//
function showInterceptForm() {
	var title = '', name = '', action = '';
	if (internalState.button) {
		title = 'Отлов супостатов';
		name  = 'target';
		action = 'city.php?nap=attack';
	}
	if (internalState.attack) {
		title = 'Отлов супостатов (напой)';
		name  = 'login';
	}
	if (internalState.blood_attack) {
		title = 'Отлов супостатов (кровь)';
		name  = 'login';
	}

	document.all("hint3").innerHTML = '<form action="' + action + '" method=POST style="margin:0; padding:0;z-index:98;position:relative" id="interceptForm">' +
		'<table width=100% cellspacing=1 cellpadding=0 bgcolor=CCC3AA><tr><td align=center><B>'
		+ title +
		'</td><td width=20 align=right valign=top style="cursor: pointer" > </td></tr><tr><td colspan=2>'+
		'<table width=100% cellspacing=0 cellpadding=2 bgcolor=FFF6DD><tr><INPUT TYPE=hidden name=sd4 value="6"><td colspan=2>'+
		'Укажите логин персонажа: <small><BR>(можно щелкнуть по логину в чате)</TD></TR><TR><TD width=50% align=right><INPUT  TYPE=text NAME="'
		+ name + '" id="interceptLogin" value=""></TD><TD width=50%><INPUT TYPE="submit" value=" »» " ></TD></TR></TABLE></td></tr></table> </FORM> ';
	document.all("hint3").style.visibility = 'visible';
	document.all("hint3").style.left = 200;
	document.all("hint3").style.top = 100;
	document.all(name).focus();
}

//
function hideInterceptForm() {
	document.all("hint3").style.visibility = 'hidden';
}
