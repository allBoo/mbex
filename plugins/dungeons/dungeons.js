//
var dungeonsPluginActive = false;

//conf
var settingsItems = ['route_Катакомбы', 'route_ПТП'];
var settings      = {};
var internalState = {
	dungeon: null,
	position: {x: 0, y:0, direction: 'N', floor: 1, step: -1, substep: -1},
	availableMoves: {f: false, b: false, l: false, r: false},
	canMove: false,
	message: ''
};

var mapScale = 18;
var currentRoute = [];
/** @var Dungeon() */
var currentDungeon = null;


//autostart plugin
chrome.extension.sendMessage({type:'getPluginState', pluginId: 'dungeons', settings: settingsItems}, function(state) {
	if (state.state) {
		startPluginDungeons(state.settings);
	}
});
//start/stop by button in settings
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type === 'startPlugin' && request.pluginId === 'dungeons' && !dungeonsPluginActive) {
		chrome.extension.sendMessage({type:'getPluginState', pluginId: 'dungeons', settings: settingsItems}, function(state) {
			if (state.state) {
				startPluginDungeons(state.settings);
			}
		});
	}
	if (request.type === 'stopPlugin' && request.pluginId === 'dungeons' && dungeonsPluginActive) {
		stopPluginDungeons();
	}
	if (request.type === 'restartPlugin' && request.pluginId === 'dungeons' && dungeonsPluginActive) {
		restartPluginDungeons();
	}
});

//
function startPluginDungeons(aSettings) {
	dungeonsPluginActive = true;

	settings = aSettings;

	// определяем где мы
	dungeons_whereIAm();
	// инициируем маршрут
	dungeons_initRoute(settings);
	// определяем текущий шаг
	dungeons_initStep();
	// определяем доступные ходы
	dungeons_getMoves();
	//
	dungeons_getErrorMessage();

	//console.log({move: ['f'], result: {x: 9, y: 1, direction: 'N'}});

	// check drop
	setTimeout(function() {
		if (dungeons_checkDrop()) {
			dungeons_drop();
		}
		// check enemy
		else if (dungeons_checkEnemy()) {
			dungeons_attack();
		}
		// next step
		else {
			// опеределяем куда идти
			dungeons_step(dungeons_getPath());
		}
	}, 500);
}

//
function stopPluginDungeons() {
	dungeonsPluginActive = false;

	console.log('dungeons stop');
}

//
function restartPluginDungeons() {
}


function dungeons_saveState() {
	localStorage['dungeons_step'] = internalState.position.step;
}

// определяет позицию в относительных координатах
// верхий левый угол = 0:0
function dungeons_whereIAm() {
	// пещера
	var url = window.location.toString();
	if (url.match(/demonscity/gi)) {
		internalState.position.dungeon = 'Катакомбы';
	}
    else if (url.match(/capitalcity/gi) || url.match(/\/\/mycombats/gi)) {
        internalState.position.dungeon = 'ПТП';
    }
	else {
		internalState.position.dungeon = null;
	}

	// позиция в координатах
	var iam = $('#wr_grotto_tpl_map_alt div div');
	internalState.position.x = parseInt(parseInt(iam.css('left')) / mapScale);
	internalState.position.y = parseInt(parseInt(iam.css('top')) / mapScale);
//internalState.position.x = 1;
//internalState.position.y = 22;

	// этаж
	var floorText = $('h3').first().text();
	if (floorText.match(/Этаж 1/gi) || floorText.match(/Провал/gi)) {
		internalState.position.floor = 1;
	}
	else if (floorText.match(/Этаж 2/gi)) {
		internalState.position.floor = 2;
	}
	else if (floorText.match(/Этаж 3/gi)) {
		internalState.position.floor = 3;
	}
	else if (floorText.match(/Этаж 4/gi)) {
		internalState.position.floor = 4;
	}
	else if (floorText.match(/Этаж 5/gi)) {
		internalState.position.floor = 5;
	}
	else {
		internalState.position.floor = -1;
	}

	// направление взгляда
	var directionText = $('#wrTplMoveContent p').last().text();
	if (directionText.match(/Север/gi)) {
		internalState.position.direction = 'N';
	}
	else if (directionText.match(/Юг/gi)) {
		internalState.position.direction = 'S';
	}
	else if (directionText.match(/Запад/gi)) {
		internalState.position.direction = 'W';
	}
	else if (directionText.match(/Восток/gi)) {
		internalState.position.direction = 'E';
	}
	else {
		internalState.position.direction = 'U';
	}

	console.log('I am at', internalState.position);
}

//
function dungeons_initRoute(settings) {
	// текущая пещера
	currentDungeon = dungeon_list.get(internalState.position.dungeon);
	if (!currentDungeon) {
		console.log('Unknown dungeon');
		return false;
	}

	// текущий путь по этажу
	var floor_route = null;
	var routes = dungeon_routes.getRoute(internalState.position.dungeon, settings['route_' + internalState.position.dungeon]);
	if (routes) {
		floor_route = routes.get(internalState.position.floor);
	}
	if (!floor_route) {
		console.log('Unknown route');
		return false;
	}
	// устанавливаем путь
	currentDungeon.floor(internalState.position.floor).setRoute(floor_route);
}

// опеределение текущего шага (контрольной точки)
function dungeons_initStep() {
	// предыдущая пещера
	var prev_dungeon = localStorage['dungeons_dungeon'];
	// предыдущий этаж
	var prev_floor = parseInt(localStorage['dungeons_floor']);

	// если не в пещере, или пещера/этаж изменилась, то устанавливаем первый шаг
	if (!dungeons_getActiveArea().length
		|| prev_dungeon != internalState.position.dungeon
		|| prev_floor != internalState.position.floor
	) {
		console.log('first position', internalState.position.floor);
		internalState.position.step = 0;
		localStorage['dungeons_step'] = internalState.position.step;
	}
	else {
		internalState.position.step = parseInt(localStorage['dungeons_step']);
	}
	localStorage['dungeons_dungeon'] = internalState.position.dungeon;
	localStorage['dungeons_floor']   = internalState.position.floor;
}

// определение пути
function dungeons_getPath() {
	if (internalState.position.floor < 0) {
		return false;
	}
	// маршрут
	var route = currentDungeon.floor(internalState.position.floor).route;
	// следующий шаг
	var step = route.get(internalState.position.step);
	if (!step) {
		console.log('No more steps');
		return false;
	}
	console.log('next step', step);
	// конечная точка шага
	if (step.reached()) {
		console.log('Step reached');
		// переходим на следующий шаг
		internalState.position.step++;
		dungeons_saveState();

		if (step.type === 'click') {
			return step.prev ? 'click_prev' : 'click';
		}
		// если простой шаг, то загружаем следующий
		else {
			return dungeons_getPath();
		}
	}
	else {
		// конечная точка шага
		var target = step.target();
		var rotate = step.rotate();
		if (target && !(target.x == internalState.position.x && target.y == internalState.position.y)) {
			console.log('target', target);
			// строим путь до этой точки
			var path = currentDungeon.path(internalState.position.floor, internalState.position.x, internalState.position.y, target.x, target.y);
			if (path) {
				return path[0];
			}
		}
		// вращение
		else if (rotate) {
			return rotate;
		}
	}
	console.log('Cannt find next step');

	return false;
}

//
function dungeons_step(step) {
	if (!step) {
		return false;
	}

	console.log('step', step);

	// клик
	if (step === 'click') {
		return dungeons_doMove('c');
	}
    else if (step === 'click_prev') {
        return dungeons_doMove('c1');
    }
	// поворот
	else if (step === 'tl' || step === 'tr') {
		return dungeons_doMove(step);
	}
	// шаг
	else if (typeof step === 'object') {
		var direction = new Point(step.x, step.y).getRotate(new Point(internalState.position.x, internalState.position.y), internalState.position.direction);
		// требуется поворот
		if (direction) {
			console.log('rotate requred');
			return dungeons_doMove(direction);
		}
		// просто идем вперед
		else {
			return dungeons_doMove('f');
		}
	}
}


function dungeons_doMove(direction) {
	console.log('do move', direction);
	if (direction == 'f' || direction == 'b' || direction == 'l' || direction == 'r') {
		if (internalState.availableMoves[direction]) {
			dungeons_waitAndMove(direction);
		}
		else {
			console.log('can not move to', direction);
			return false;
		}
	}
	else if (direction == 'tl' || direction == 'tr') {
		dungeons_move(direction);
		return true;
	}
	else if (direction == 'c') {
		dungeons_saveState();

		$('#wr_grotto_tpl3d_in').children().last().click();
		//$('#wr_attack_win').children().first().focus();
	}
    else if (direction == 'c1') {
        dungeons_saveState();

        $('#wr_grotto_tpl3d_in').children().last().prev().click();
        //$('#wr_attack_win').children().first().focus();
    }
}

function dungeons_waitAndMove(direction)
{
	if (!dungeons_canMove()) {
		console.log('wait to move', direction);
		setTimeout(function() {
			dungeons_waitAndMove(direction);
		}, 1000);
	}
	else {
		dungeons_move(direction);
	}
}

function dungeons_move(direction) {
	dungeons_saveState();

	var vf = document.getElementById("grotto_vectors_form");
	var vfm = document.getElementById("grotto_vectors_form_move");
	vfm.value = direction;
	vf.submit();
}
function dungeons_stepForward() {
	dungeons_move('f');
}
function dungeons_stepBackward() {
	dungeons_move('b');
}
function dungeons_stepLeft() {
	dungeons_move('l');
}
function dungeons_stepRight() {
	dungeons_move('r');
}
function dungeons_turnLeft() {
	dungeons_move('tl');
}
function dungeons_turnRight() {
	dungeons_move('tr');
}

function dungeons_getMoves() {
	internalState.availableMoves.f = $('#wr_grotto_vector_move_top').css('display') !== 'none' ? true : false;
	internalState.availableMoves.b = $('#wr_grotto_vector_move_bottom').css('display') !== 'none' ? true : false;
	internalState.availableMoves.l = $('#wr_grotto_vector_move_left').css('display') !== 'none' ? true : false;
	internalState.availableMoves.r = $('#wr_grotto_vector_move_right').css('display') !== 'none' ? true : false;
}

function dungeons_canMove() {
	internalState.canMove = $('#wr_td_progress').children().length == 65;
	return internalState.canMove;
}

function dungeons_getErrorMessage() {
	var p = $('p').first();
	if (p.css('color') === 'red') {
		internalState.message = p.text();
		console.log(internalState.message);
	}
	else {
		internalState.message = '';
	}
}

function dungeons_checkEnemy() {
	return $('#wr_grotto_tpl3d_in div[onclick^=wr_click_fun_for_attack]').length > 0;
}

function dungeons_getActiveArea() {
	return $('#wr_grotto_tpl3d_in');
}

function dungeons_attack() {
	console.log('Enemy attack');
	$('#wr_grotto_tpl3d_in').children().last().click();
	$('#wr_attack_win').children().first().focus();
	$('#wr_attack_win').children().first().click();
	$('#wr_grotto_attack_form').submit();
}

function dungeons_checkDrop() {
	return $('#wr_grotto_partner_and_godsend').find('img.grotto_drop_img').length > 0;
}

function dungeons_drop() {
	console.log('get drop');
	$('#wr_grotto_partner_and_godsend').find('img.grotto_drop_img').last().click();
}
