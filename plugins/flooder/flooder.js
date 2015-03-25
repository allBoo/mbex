//
var flooderPluginActive = false;

//conf
var settingsItems = ['message', 'period'];
var settings      = {};
var internalState = {
    period: 180000,
	timer: 0,
    messages: []
};


//autostart plugin
chrome.extension.sendMessage({type:'getPluginState', pluginId: 'flooder', settings: settingsItems}, function(state) {
	if (state.state) {
		startPluginFlooder(state.settings);
	}
});
//start/stop by button in settings
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);
	if (request.type === 'startPlugin' && request.pluginId === 'flooder' && !flooderPluginActive) {
		chrome.extension.sendMessage({type:'getPluginState', pluginId: 'flooder', settings: settingsItems}, function(state) {
			if (state.state) {
				startPluginFlooder(state.settings);
			}
		});
	}
	if (request.type === 'stopPlugin' && request.pluginId === 'flooder' && flooderPluginActive) {
		stopPluginFlooder();
	}
	if (request.type === 'restartPlugin' && request.pluginId === 'flooder' && flooderPluginActive) {
        chrome.extension.sendMessage({type:'getPluginState', pluginId: 'flooder', settings: settingsItems}, function(state) {
            if (state.state) {
                restartPluginFlooder(state.settings);
            }
        });
	}
});

//
function startPluginFlooder(aSettings) {
    // страница грузится 2 раза, одна для чата, вторая для табов
    if (!$('#ssmtext').length) {
        console.log('Autoflooder ignore');
        return false;
    }

    flooderPluginActive = true;

	settings = aSettings;

	console.log('Autoflooder started');

    // период между сообщениями в мкс
    internalState.period = parseInt(settings['period']) * 60 * 1000;
    // список сообщений
    internalState.messages = settings['message'].replace("\r", '').split("\n");
    console.log(internalState.messages);

    // время отправки последнего сообщения
    var last_message_time_str = parseInt(localStorage['flooder_last_message_time']);
    if (!isNaN(last_message_time_str) && last_message_time_str) {
        // сколько прошло времени (в мкс)
        var current_period = new Date() - new Date(last_message_time_str);
        console.log('Current period', current_period);
        // если прошло меньше заданного периода, отправляем сообщение по тайму
        // в остальных случаях отправляем по стандартному тайму
        if (current_period < internalState.period) {
            console.log('Set deferred loop', internalState.period - current_period);
            internalState.timer = setTimeout('flooder_loop()', internalState.period - current_period);
        }
        else {
            console.log('Set standart deferred loop', internalState.period);
            internalState.timer = setTimeout('flooder_loop()', internalState.period);
        }
    }
    else {
        console.log('Set standart deferred loop', internalState.period);
        internalState.timer = setTimeout('flooder_loop()', internalState.period);
    }
}

//
function stopPluginFlooder() {
    flooderPluginActive = false;
    if (internalState.timer) {
        clearTimeout(internalState.timer);
        internalState.timer = 0;
    }
}

//
function restartPluginFlooder(aSettings) {
    stopPluginFlooder();
    startPluginFlooder(aSettings);
}


function flooder_loop() {
    var lastMessageIndex = parseInt(localStorage['flooder_last_message_id']);
    if (isNaN(lastMessageIndex)) {
        lastMessageIndex = 0;
    }
    else {
        lastMessageIndex += 1;
    }
    if (lastMessageIndex >= internalState.messages.length) {
        lastMessageIndex = 0;
    }

    var message = internalState.messages[lastMessageIndex];
    if (message) {
        console.log('Send message', message);
        message = 'private [trade]' + message;
        $('#ssmtext').val(message);
        $('#T3').find('a').first()[0].click();
    }

    localStorage['flooder_last_message_id'] = lastMessageIndex;
    localStorage['flooder_last_message_time'] = new Date().getTime();

    // следующее сообщение через период + 5сек
    internalState.timer = setTimeout('flooder_loop()', internalState.period + 5000);
}
