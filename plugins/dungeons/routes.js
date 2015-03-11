
var dungeon_routes = new RoutesCollection([
    new Routes('Каты верхом', 'Катакомбы', [
        // 1-й этаж
        new Route(1, [
            new Click(1, 20),    // водосток со спасом c2
            new Click(6, 20),    // камень c7
            new Click(3, 18),    // камень e4
            new Move(2, 18),     // e3
            new Move(1, 18),     // e2
            new Click(1, 14),    // камень i2
            new Move(3, 15),     // h4
            new Move(5, 12),     // k6
            new Click(7, 20),    // камень с8
            new Click(10, 21),   // камень b11
            new Click(9, 8),     // фонтан o10
            new Click(10, 11),   // сундук i11
            new Click(2, 11),    // сундук l3
            new Click(2, 11),    // сундук l3 2 раза
            new Move(2, 8),      // o3
            new Move(4, 3),      // t5
            new Move(2, 4),      // s3
            new Click(5, 4),     // портал s6
            new Click(6, 5),     // ключ r7
            new Move(6, 5),      // r7
            new Move(6, 3),      // t7
            new ClickNow(6, 4, 'E'),     // дверь s8
            new Click(10, 4),    // сундук s11
            new Click(6, 1)      // спуск v7
        ]),
        // 2-й этаж
        new Route(2, [
            new Move(3, 4),     // h4
            new Move(1, 9),     // c2
            new Move(5, 9),     // c6
            new Click(7, 10),   // b8
            new Click(10, 6),   // f11
            new Move(9, 9),     // c10
            new Move(5, 2),     // j6
            new Move(7, 2),     // j8
            new Move(9, 1)      // k10 - exit
        ]),
        // 3-й этаж
        new Route(3, [
            new Move(5, 5),     // q6
            new Click(8, 15),   // g9
            new Move(1, 12),    // j2
            new Move(2, 14),    // h3
            new Move(10, 19),   // c11
            new Move(6, 8),     // n7
            new Move(5, 8),     // n6
            new Click(1, 7)     // o2 - exit
        ]),
        // 4-й этаж
        new Route(4, [
            new Move(9, 4),     // h10
            new Click(9, 1),    // k10
            new Move(8, 1),     // k9
            new Move(8, 3),     // i9
            new Move(10, 3),    // i11
            new Move(10, 1),    // k11
            new Move(3, 10),    // b4
            new Move(1, 10),    // b2
            new Move(2, 9),     // c3
            new Move(3, 8),     // d4
            new Move(1, 8),     // d2
            new Click(1, 9),    // c2
            new Move(7, 4),     // h8
            new Click(7, 1),    // k8
            new Move(6, 1),     // k7
            new Move(5, 2),     // j6
            new Move(5, 4),     // h6
            new ClickNow(5, 1, 'W'),    // k5
            new Click(3, 3),    // i4
            new Move(2, 3)      // i3 - exit
        ])
    ]),

    new Routes('Каты низом', 'Катакомбы', [
        // 1-й этаж
        new Route(1, [
            new Click(1, 20),    // водосток со спасом c2
            new Click(6, 20),    // камень c7
            new Click(3, 18),    // камень e4
            new Move(2, 18),     // e3
            new Move(1, 18),     // e2
            new Click(1, 14),    // камень i2
            new Move(3, 15),     // h4
            new Move(5, 12),     // k6
            new Click(9, 8),     // фонтан o10
            new Click(10, 11),   // сундук i11
            new Click(2, 11),    // сундук l3
            new Click(2, 11),    // сундук l3 2 раза
            new Move(2, 8),      // o3
            new Move(4, 3),      // t5
            new Move(2, 4),      // s3
            new Click(5, 4),     // портал s6
            new Click(6, 5),     // ключ r7
            new ClickNow(6, 4, 'E'),     // дверь s8
            new Click(10, 4),    // сундук s11
            new Move(6, 2),      // u7
            new ClickNow(6, 6, 'S'),      // дверь
            new Click(7, 20),    // камень с8
            new Click(10, 21),   // камень b11
            new Move(8, 21),     // b9 - спуск
            new Move(16, 18),    // e17
            new Move(18, 13)     // j19 - выход
        ]),
        // 2-й этаж
        new Route(2, [
            new Move(15, 8),     // d16
            new Move(20, 10),    // b21
            new Move(14, 5),     // g15
            new Move(17, 3),     // k16 - ловушка
            new Move(20, 3),     // i22 - поиск слизи
            new Click(21, 1),    // k22
            new Move(22, 1)      // k23 - выход
        ]),
        // 3-й этаж
        new Route(3, [
            new Move(8, 19),    // c9
            new Move(2, 20),    // b3
            new Move(2, 14),    // h3
            new Move(1, 12),    // j2
            new Click(8, 15),   // g9
            new Move(5, 5),     // q6
            new Move(2, 2),     // t3
            new Move(6, 8),     // n7
            new Move(4, 7),     // o5
            new Click(1, 7)     // o2 - exit
        ]),
        // 4-й этаж
        new Route(4, [
            new Move(9, 4),     // h10
            new Click(9, 1),    // k10
            new Move(8, 1),     // k9
            new Move(8, 3),     // i9
            new Move(10, 3),    // i11
            new Move(10, 1),    // k11
            new Move(3, 10),    // b4
            new Move(1, 10),    // b2
            new Move(2, 9),     // c3
            new Move(3, 8),     // d4
            new Move(1, 8),     // d2
            new Click(1, 9),    // c2
            new Move(7, 4),     // h8
            new Click(7, 1),    // k8
            new Move(6, 1),     // k7
            new Move(5, 2),     // j6
            new Move(5, 4),     // h6
            new ClickNow(5, 1, 'W'),    // k5
            new Click(3, 3),    // i4
            new Move(2, 3)      // i3 - exit
        ])
    ])
]);
