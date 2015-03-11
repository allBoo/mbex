// autostart plugin
chrome.extension.sendMessage({type:'getPluginState', pluginId: 'inventory'}, function(state) {
	if (state.state) {
		startPluginInventory();
	}
});
// start/stop by button in settings
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type === 'startPlugin' && request.pluginId === 'inventory' && !inventoryPluginActive) {
		startPluginInventory();
	}
	if (request.type === 'stopPlugin' && request.pluginId === 'inventory' && inventoryPluginActive) {
		stopPluginInventory();
	}
});

var inventoryPluginActive = false;
var inventoryItemsMap = {
	"1": ["enh_"],
	"5": ["event_valentine_reward_"]
};

function startPluginInventory() {
	inventoryPluginActive = true;

	// determine current inventory tab and sub-tab
	var menuTable = $($("#tableForInventory").find("tr > td:nth-child(1)")[0]);
	var selectedItem = 0;
	var extPart = window.location.hash == '#ext' ? true : false;
	menuTable.find("tbody > tr > td").each(function(num, el) {
		if ($(el).attr('bgcolor') == '#A5A5A5') {
			selectedItem = num;
		}
	});

	// replace menu table
	var newMenu = '<TABLE border=0 width=100% cellspacing="0" cellpadding="3" bgcolor=#d4d2d2><TR>' +
	'<TD  align=center bgcolor="' + (selectedItem == 0 ? '#A5A5A5' : '#C7C7C7') + '"><A HREF="?edit=1&razdel=0">Обмундирование</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 1 && extPart == false ? '#A5A5A5' : '#C7C7C7') + '" id="razdel1"><A HREF="?edit=1&razdel=1">Заклятия</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 1 && extPart == true  ? '#A5A5A5' : '#C7C7C7') + '" id="extRazdel1"><A HREF="?edit=1&razdel=1#ext" ' + (selectedItem == 1 ? 'onclick="window.location.href=this.href; location.reload();"' : '') + '>Чарки</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 2 ? '#A5A5A5' : '#C7C7C7') + '"><A HREF="?edit=1&razdel=4">Эликсиры</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 3 ? '#A5A5A5' : '#C7C7C7') + '"><A HREF="?edit=1&razdel=3">Еда</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 4 ? '#A5A5A5' : '#C7C7C7') + '"><A HREF="?edit=1&razdel=5">Руны</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 5 && extPart == false ? '#A5A5A5' : '#C7C7C7') + '" id="razdel2"><A HREF="?edit=1&razdel=2">Прочее</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 5 && extPart == true  ? '#A5A5A5' : '#C7C7C7') + '" id="extRazdel2"><A HREF="?edit=1&razdel=2#ext" ' + (selectedItem == 5 ? 'onclick="window.location.href=this.href; location.reload();"' : '') + '>Цветы</A></TD>' +
	'</TR></TABLE>';
	menuTable.html(newMenu);

	inventoryRenderRazdel(selectedItem, extPart);
}

function stopPluginInventory()
{
	inventoryPluginActive = false;

	// determine current inventory tab and sub-tab
	var menuTable = $($("#tableForInventory").find("tr > td:nth-child(1)")[0]);
	var selectedItem = 0;
	menuTable.find("tbody > tr > td").each(function(num, el) {
		if ($(el).attr('bgcolor') == '#A5A5A5') {
			selectedItem = num;
		}
	});

	// replace menu table
	var newMenu = '<TABLE border=0 width=100% cellspacing="0" cellpadding="3" bgcolor=#d4d2d2><TR>' +
	'<TD  align=center bgcolor="' + (selectedItem == 0 ? '#A5A5A5' : '#C7C7C7') + '"><A HREF="?edit=1&razdel=0">Обмундирование</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 1 ? '#A5A5A5' : '#C7C7C7') + '" id="razdel1"><A HREF="?edit=1&razdel=1">Заклятия</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 2 ? '#A5A5A5' : '#C7C7C7') + '"><A HREF="?edit=1&razdel=4">Эликсиры</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 3 ? '#A5A5A5' : '#C7C7C7') + '"><A HREF="?edit=1&razdel=3">Еда</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 4 ? '#A5A5A5' : '#C7C7C7') + '"><A HREF="?edit=1&razdel=5">Руны</A></TD>' +
	'<TD  align=center bgcolor="' + (selectedItem == 5 ? '#A5A5A5' : '#C7C7C7') + '" id="razdel2"><A HREF="?edit=1&razdel=2">Прочее</A></TD>' +
	'</TR></TABLE>';
	menuTable.html(newMenu);

	inventoryRenderRazdel(selectedItem, false);
}

function inventoryRenderRazdel(num, ext) {
	if (num == 1 || num == 5) {
		if (ext) {
			$('#razdel' + num).attr('bgcolor', '#C7C7C7');
			$('#extRazdel' + num).attr('bgcolor', '#A5A5A5');
			inventoryShowItems(inventoryItemsMap[num]);
		}
		else {
			$('#extRazdel' + num).attr('bgcolor', '#C7C7C7');
			$('#razdel' + num).attr('bgcolor', '#A5A5A5');
			inventoryHideItems(inventoryItemsMap[num]);
		}
	}
}

function inventoryShowItems(patterns) {
}

function inventoryHideItems(patterns) {
}
