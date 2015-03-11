function Dungeons() {
    this.collection = {};
    if (arguments[0]) {
        this.addDungeons(arguments[0]);
    }
}
Dungeons.prototype.addDungeon = function(dungeon) {
    this.collection[dungeon.n] = dungeon;
};
Dungeons.prototype.addDungeons = function(dungeons) {
    for (var i = 0; i < dungeons.length; i++) {
        this.addDungeon(dungeons[i]);
    }
};
/** @return Dungeon */
Dungeons.prototype.get = function(dungeon) {
    return this.collection[dungeon] ? this.collection[dungeon] : null;
};


function Dungeon() {
    this.n = arguments[0];
    this.floors = {};
    if (arguments[1]) {
        this.addFloors(arguments[1]);
    }
}
Dungeon.prototype.addFloor = function(floor) {
    this.floors[floor.n] = floor;
};
Dungeon.prototype.addFloors = function(floors) {
    for (var i = 0; i < floors.length; i++) {
        this.addFloor(floors[i]);
    }
};
Dungeon.prototype.floor = function(n) {
    return this.floors[n] ? this.floors[n] : null;
};
Dungeon.prototype.cell = function(n, x, y) {
    return this.floor(n).cell(x, y);
};
Dungeon.prototype.neighbors = function(n, x, y) {
    return this.floor(n).neighbors(x, y);
};

Dungeon.prototype.path = function (n, x, y, tox, toy) {
    var wave     = {};
    var wave_map = {};
    var path     = [];
    var source   = this.cell(n, x, y);
    var target   = this.cell(n, tox, toy);
    var position = 0;

    if (!source) {
        return false;
    }
    if (!target) {
        return false;
    }
    if (source.id == target.id) {
        return false;
    }

    wave[position]      = [{x:source.x, y:source.y}];
    wave_map[source.id] = position;

    // проходим по текущему уровню волны, собираем все соседние точки всех точек из этой волны и добавляем их в следующий щаг волны
    var reached  = false;
    var new_wave = false;
    var next_position = 0;
    do {
        next_position = position + 1;
        new_wave = false;

        for (var i = 0; i < wave[position].length; i++) {
            var cell = wave[position][i];
            var neighbors = this.neighbors(n, cell.x, cell.y);
            // добавляем в следующую волну, если клетка еще не использовалась
            for (var j = 0; j < neighbors.length; j++) {
                // если цель достигнута, дальше не пойдем
                if (neighbors[j].id === target.id) {
                    reached = true;
                }
                if (wave_map[neighbors[j].id] === undefined) {
                    new_wave = true;
                    if (!wave[next_position]) {
                        wave[next_position] = [];
                    }
                    wave[next_position].push({x: neighbors[j].x, y: neighbors[j].y});
                    wave_map[neighbors[j].id] = next_position;
                }
            }
        }
        position++;
    }
    while(!reached && new_wave);

    // если цель достигнута, формируем кратчайший путь
    if (reached) {
        var cell = target;
        do {
            path.push(cell);

            var prev_position = position - 1;
            // соседи
            var neighbors = this.neighbors(n, cell.x, cell.y);
            // ищем среди них того, который в предыдущей волне
            var found = false;
            for (var i = 0; i < neighbors.length; i++) {
                if (wave_map[neighbors[i].id] === prev_position) {
                    cell = neighbors[i];
                    found = true;
                    break;
                }
            }
            if (!found) {
                // если ничего не нашли, значит какой-то косяк
                console.log('Cannt build reverse path');
                return false;
            }
            position--;
        }
        while (position >= 0 && cell.id != source.id);

        return path.reverse();
    }
    // если не достигнута, то печаль
    else {
        console.log('Target unreachable');
        return false;
    }
};


function Floor() {
    this.n = arguments[0];
    this.cells = {};
    this.route = null;
    if (arguments[1]) {
        this.addCells(arguments[1]);
    }
    if (arguments[2]) {
        this.setRoute(arguments[2]);
    }
}
Floor.prototype.addCell = function(cell) {
    this.cells[cell.id] = cell;
};
Floor.prototype.addCells = function(cells) {
    for (var i = 0; i < cells.length; i++) {
        this.addCell(cells[i]);
    }
};
Floor.prototype.setRoute = function(route) {
    this.route = route;
};
Floor.prototype.cell = function (x, y) {
    return this.cells['cell_' + x + '_' + y];
};
Floor.prototype.neighbors = function(x, y) {
    var neighbors = [];
    var cell = this.cell(x, y);
    var test_cell = undefined;
    if (cell.borders[0] && (test_cell = this.cell(x - 1, y))) {
        neighbors.push(test_cell);
    }
    if (cell.borders[1] && (test_cell = this.cell(x, y - 1))) {
        neighbors.push(test_cell);
    }
    if (cell.borders[2] && (test_cell = this.cell(x + 1, y))) {
        neighbors.push(test_cell);
    }
    if (cell.borders[3] && (test_cell = this.cell(x, y + 1))) {
        neighbors.push(test_cell);
    }

    return neighbors;
};
Floor.prototype.setRoute = function(route) {
    this.route = route;
};


function Cell() {
    this.x = arguments[0];
    this.y = arguments[1];
    this.id = 'cell_'+arguments[0]+'_'+arguments[1];
    this.borders = arguments[2];
    this.name = arguments[3];
    this.creatures = arguments[4] || null;
    this.features = arguments[5] || null;
    this.persons = arguments[6] || null;
    this.xpos = this.x * 18;
    this.ypos = this.y * 18;
}

// маршрут по этажу
function Route() {
    this.floor = arguments[0];
    this.path  = [];
    if (arguments[1]) {
        this.addPaths(arguments[1]);
    }
}
Route.prototype.addPath = function(path) {
    this.path.push(path);
};
Route.prototype.addPaths = function(paths) {
    for (var i = 0; i < paths.length; i++) {
        this.addPath(paths[i]);
    }
};
Route.prototype.get = function(n) {
    return this.path[n] ? this.path[n] : null;
};


// маршрут по этажам пещеры
function Routes() {
    this.name    = arguments[0];
    this.dungeon = arguments[1];
    this.routes  = {};
    if (arguments[2]) {
        this.addRoutes(arguments[2]);
    }
}
Routes.prototype.addRoute = function(route) {
    this.routes[route.floor] = route;
};
Routes.prototype.addRoutes = function(routes) {
    for (var i = 0; i < routes.length; i++) {
        this.addRoute(routes[i]);
    }
};
Routes.prototype.get = function(floor) {
    return this.routes[floor] ? this.routes[floor] : null;
};


// коллекция всех маршрутов
function RoutesCollection() {
    this.collection = {};
    if (arguments[0]) {
        this.addRoutes(arguments[0]);
    }
}
RoutesCollection.prototype.addRoute = function(route) {
    if (!this.collection[route.dungeon]) {
        this.collection[route.dungeon] = {};
    }
    this.collection[route.dungeon][route.name] = route;
};
RoutesCollection.prototype.addRoutes = function(routes) {
    for (var i = 0; i < routes.length; i++) {
        this.addRoute(routes[i]);
    }
};
RoutesCollection.prototype.getRoute = function(dungeon, name) {
    return this.collection[dungeon] && this.collection[dungeon][name] ? this.collection[dungeon][name] : null;
};


function Click() {
    this.type = 'click';
    this.x = arguments[0];
    this.y = arguments[1];
}
Click.prototype.target = function() {
    // все через жопу)

    // находим все соседние точки
    var neighbors = currentDungeon.neighbors(internalState.position.floor, this.x, this.y);
    // если мы уже достигли одного из соседей, уходим
    for (var i = 0; i < neighbors.length; i++) {
        if (neighbors[i].x == internalState.position.x && neighbors[i].y == internalState.position.y) {
            return false;
        }
    }

    // для каждой из них находим путь до текущей позиции перса и выбираем кратчайший
    var minPath = null;
    for (var i = 0; i < neighbors.length; i++) {
        var path = currentDungeon.path(internalState.position.floor, internalState.position.x, internalState.position.y, neighbors[i].x, neighbors[i].y);
        //console.log('path', path);
        if (path && (!minPath || minPath.length > path.length)) {
            minPath = path;
        }
    }
    //console.log('min path', minPath);
    if (minPath) {
        // возвращаем последнюю точку в пути
        return minPath.pop();
    }
    else {
        return false;
    }
};
Click.prototype.rotate = function() {
    // ожидаемое направление взгляда
    return new Point(this.x, this.y).getRotate(new Point(internalState.position.x, internalState.position.y), internalState.position.direction);
};
Click.prototype.reached = function() {
    // находим все соседние точки
    var neighbors = currentDungeon.neighbors(internalState.position.floor, this.x, this.y);
    for (var i = 0; i < neighbors.length; i++) {
        // если мы на соседней клетке, проверим направление взгляда
        if (neighbors[i].x == internalState.position.x && neighbors[i].y == internalState.position.y) {
            var expectedDirection = new Point(this.x, this.y).getDirection(new Point(neighbors[i].x, neighbors[i].y));
            return expectedDirection == internalState.position.direction;
        }
    }

    return false;
};


function Move() {
    this.type = 'move';
    this.x = arguments[0];
    this.y = arguments[1];
}
Move.prototype.target = function() {
    return {x: this.x, y: this.y};
};
Move.prototype.reached = function() {
    return this.x == internalState.position.x && this.y == internalState.position.y;
};
Move.prototype.rotate = function() {
    return false;
};

function ClickNow() {
    this.type = 'click';
    this.x = arguments[0];
    this.y = arguments[1];
    this.d = arguments[2];
}
ClickNow.prototype.target = function() {
    return {x: this.x, y: this.y};
};
ClickNow.prototype.reached = function() {
    return this.x == internalState.position.x && this.y == internalState.position.y && this.d == internalState.position.direction;
};
ClickNow.prototype.rotate = function() {
    var rotateMap = {
        N: {N: false, S: 'tl', W: 'tr', E: 'tl', U: false},
        S: {N: 'tl', S: false, W: 'tl', E: 'tr', U: false},
        W: {N: 'tl', S: 'tr', W: false, E: 'tl', U: false},
        E: {N: 'tr', S: 'tl', W: 'tl', E: false, U: false}
    };

    if (this.d != internalState.position.direction) {
        return rotateMap[this.d][internalState.position.direction];
    }
    else {
        return false;
    }
};



function Point(x, y) {
    this.x = x;
    this.y = y;
}
// ожидаемое направление взгляда переданной точки
Point.prototype.getDirection = function(point) {
    var expectedDirection = null;
    // клетка слева
    if (point.x < this.x) {
        expectedDirection = 'E';
    }
    else if (point.x > this.x) {
        expectedDirection = 'W';
    }
    else if (point.y < this.y) {
        expectedDirection = 'S';
    }
    else if (point.y > this.y) {
        expectedDirection = 'N';
    }

    return expectedDirection;
};
Point.prototype.getRotate = function(point, direction) {
    var rotateMap = {
        N: {N: false, S: 'tl', W: 'tr', E: 'tl', U: false},
        S: {N: 'tl', S: false, W: 'tl', E: 'tr', U: false},
        W: {N: 'tl', S: 'tr', W: false, E: 'tl', U: false},
        E: {N: 'tr', S: 'tl', W: 'tl', E: false, U: false}
    };
    var expectedDirection = this.getDirection(point);

    if (expectedDirection != direction) {
        return rotateMap[expectedDirection][direction];
    }
    else {
        return false;
    }
};
