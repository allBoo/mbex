﻿var dungeon_list = new Dungeons([
   new Dungeon('Катакомбы', [
       // 1й этаж
       new Floor(1, [
          new Cell(1, 22, [0,1,0,0], 'Коридор', null, ['door']),
          new Cell(1, 21, [0,1,0,1], 'Коридор', null, null),
          new Cell(1, 20, [0,1,1,1], 'Коридор', null, ['drainbottom1']),
          new Cell(1, 19, [0,1,1,1], 'Коридор', null, null),
          new Cell(1, 18, [0,1,1,1], 'Коридор', [{name: 'sm', level:8, count: 1}], ['gobelin01'], null),
          new Cell(1, 17, [0,1,1,1], 'Коридор', null, null),
          new Cell(1, 16, [0,1,0,1], 'Коридор', null, null),
          new Cell(1, 15, [0,0,0,1], 'Коридор', [{name: 'sm', level:8, count: 1},{name: 'rm', level:7, count: 2}], null),
          new Cell(1, 14, [0,0,0,1], 'Коридор', null, ['brik']),
          new Cell(1, 11, [0,1,0,0], 'Коридор', null, ['bed']),
          new Cell(1, 10, [0,0,1,0], 'Коридор', null, null),
          new Cell(1,  9, [0,1,0,0], 'Коридор', null, ['bed']),
          new Cell(1,  8, [0,0,1,0], 'Коридор', null, null),
          new Cell(1,  7, [0,1,0,0], 'Коридор', null, ['bed']),
          new Cell(1,  6, [0,0,1,0], 'Коридор', null, null),
          new Cell(1,  5, [0,1,0,0], 'Коридор', null, ['bed']),
          new Cell(1,  4, [0,0,1,0], 'Коридор', null, null),
          new Cell(1,  3, [0,1,0,0], 'Коридор', null, ['bed']),
          new Cell(1,  2, [0,0,1,0], 'Коридор', null, null),

          new Cell(2, 20, [1,1,1,0], 'Коридор', null, null),
          new Cell(2, 19, [1,1,0,1], 'Коридор', null, null),
          new Cell(2, 18, [1,1,0,1], 'Коридор', [{name: 'sm', level:8, count: 1}], null),
          new Cell(2, 17, [1,0,1,1], 'Коридор', null, null),
          new Cell(2, 14, [0,0,1,0], 'Коридор', null, ['teleportdemshut']),
          new Cell(2, 11, [0,1,0,0], 'Коридор', null, ['chest4']),
          new Cell(2, 10, [1,0,1,0], 'Коридор', [{name: 'og', level:8, count: 1}], null),
          new Cell(2,  9, [0,1,0,0], 'Коридор', null, ['chest1dem1']),
          new Cell(2,  8, [1,0,1,0], 'Коридор', [{name: 'lit', level:8, count: 1},{name: 'lit', level:7, count: 4}], null),
          new Cell(2,  7, [0,1,0,0], 'Коридор', null, ['chest1dem1']),
          new Cell(2,  6, [1,0,1,0], 'Коридор', null, null),
          new Cell(2,  5, [0,1,0,0], 'Коридор', null, ['chest1dem1']),
          new Cell(2,  4, [1,0,1,0], 'Коридор', [{name: 'lit', level:8, count: 2}], null),
          new Cell(2,  3, [0,1,0,0], 'Коридор', null, ['chest1dem1']),
          new Cell(2,  2, [1,0,1,0], 'Коридор', null, null),

          new Cell(3, 20, [1,0,1,0], 'Коридор', [{name: 'smm', level:8, count: 1}], null),
          new Cell(3, 18, [1,1,1,0], 'Коридор', null, ['brik']),
          new Cell(3, 17, [1,1,1,0], 'Коридор', [{name: 'rm', level:7, count: 6}], null),
          new Cell(3, 16, [0,1,0,1], 'Коридор', null, null),
          new Cell(3, 15, [0,1,0,1], 'Коридор', [{name: 'smm', level:8, count: 1},{name: 'rm', level:7, count: 2}], null),
          new Cell(3, 14, [0,0,0,1], 'Коридор', null, null),
          new Cell(3, 13, [0,0,0,1], 'Коридор', null, ['teleportdemchern']),
          new Cell(3, 10, [1,0,1,0], 'Коридор', null, null),
          new Cell(3,  8, [1,0,1,0], 'Коридор', null, null),
          new Cell(3,  6, [1,0,1,0], 'Коридор', null, null),
          new Cell(3,  4, [1,0,1,0], 'Коридор', null, null),
          new Cell(3,  2, [1,0,1,0], 'Коридор', null, null),

          new Cell(4, 20, [1,1,1,0], 'Коридор', null, null),
          new Cell(4, 19, [0,1,0,1], 'Коридор', [{name: 'sm', level:8, count: 2}], null),
          new Cell(4, 18, [0,1,0,1], 'Коридор', null, null),
          new Cell(4, 17, [1,0,1,1], 'Коридор', null, ['drainbottom2']),
          new Cell(4, 14, [1,0,0,0], 'Коридор', null, ['teleportdemepisk']),
          new Cell(4, 10, [1,1,0,0], 'Коридор', [{name: 'ng', level:9, count: 2}], null),
          new Cell(4,  9, [0,1,0,1], 'Коридор', null, null),
          new Cell(4,  8, [1,1,1,1], 'Коридор', null, null),
          new Cell(4,  7, [0,1,0,1], 'Коридор', null, null),
          new Cell(4,  6, [1,1,0,1], 'Коридор', [{name: 'ng', level:8, count: 2}], null),
          new Cell(4,  5, [0,1,0,1], 'Коридор', null, null),
          new Cell(4,  4, [1,1,0,1], 'Коридор', null, null),
          new Cell(4,  3, [0,1,0,1], 'Коридор', [{name: 'lit', level:7, count: 6}], null),
          new Cell(4,  2, [1,0,0,1], 'Коридор', null, null),

          new Cell(5, 20, [1,0,0,0], 'Коридор', [{name: 'sm', level:8, count: 1},{name: 'rm', level:7, count: 2}], null),
          new Cell(5, 17, [1,1,1,0], 'Коридор', [{name: 'smm', level:8, count: 1},{name: 'rm', level:7, count: 2}], null),
          new Cell(5, 16, [0,1,0,1], 'Коридор', null, null),
          new Cell(5, 15, [0,1,0,1], 'Коридор', [{name: 'sm', level:8, count: 2},{name: 'smm', level:8, count: 1}], null),
          new Cell(5, 14, [0,1,0,1], 'Коридор', null, null),
          new Cell(5, 13, [0,1,0,1], 'Коридор', null, ['drainbottom3']),
          new Cell(5, 12, [0,0,0,1], 'Коридор', [{name: 'smm', level:8, count: 1, alignment:1}], null),
          new Cell(5, 11, [0,0,0,1], 'Коридор', null, ['chest3']),
          new Cell(5, 10, [1,0,1,0], 'Коридор', null, ['barrikada']),
          new Cell(5,  8, [1,0,1,0], 'Коридор', null, null),
          new Cell(5,  4, [1,0,0,0], 'Коридор', null, ['teleport41']),

          new Cell(6, 20, [1,0,0,0], 'Коридор', null, ['brik']),
          new Cell(6, 17, [1,0,1,0], 'Коридор', null, null),
          new Cell(6, 10, [0,1,1,0], 'Коридор', [{name: 'ng', level:8, count: 2},{name: 'lit', level:7, count: 2}], null),
          new Cell(6,  9, [0,1,0,1], 'Коридор', null, null),
          new Cell(6,  8, [1,1,1,1], 'Коридор', [{name: 'sg', level:8, count: 2}], null),
          new Cell(6,  7, [0,0,0,1], 'Коридор', null, null),
          new Cell(6,  6, [0,1,0,1], 'Коридор', null, ['door1']),
          new Cell(6,  5, [0,1,0,1], 'Коридор', [{name: 'ng', level:9, count: 1}], ['key35']),
          new Cell(6,  4, [0,1,0,1], 'Коридор', null, null),
          new Cell(6,  3, [0,1,0,1], 'Коридор', null, null),
          new Cell(6,  2, [0,0,1,1], 'Коридор', [{name: 'rg', level:8, count: 2},{name: 'ng', level:8, count: 1}], null),
          new Cell(6,  1, [0,0,0,1], 'Коридор', null, ['drainbottom4']),

          new Cell(7, 20, [0,0,1,0], 'Коридор', null, ['brik']),
          new Cell(7, 18, [0,1,1,0], 'Коридор', null, null),
          new Cell(7, 17, [1,0,0,1], 'Коридор', null, null), // запрет идти на ловушку
          new Cell(7, 16, [0,0,1,1], 'Коридор', null, ['skelet1']),
          new Cell(7, 10, [1,0,1,0], 'Коридор', null, null),
          new Cell(7,  8, [1,0,1,0], 'Коридор', null, null),
          new Cell(7,  4, [0,0,1,0], 'Коридор', null, ['door2']),
          new Cell(7,  2, [1,0,1,0], 'Коридор', null, null),

          new Cell(8, 21, [0,0,1,0], 'Коридор', null, ['proboina']),
          new Cell(8, 20, [0,1,1,0], 'Коридор', null, null),
          new Cell(8, 19, [0,1,0,1], 'Коридор', [{name: 'sm', level:8, count: 1},{name: 'rm', level:7, count: 3}], null),
          new Cell(8, 18, [1,0,1,1], 'Коридор', null, null),
          new Cell(8, 17, [1,1,1,1], 'Коридор', null, ['stat1']),
          new Cell(8, 16, [0,1,1,0], 'Коридор', null, null),
          new Cell(8, 15, [0,1,0,1], 'Коридор', [{name: 'sm', level:8, count: 1},{name: 'smm', level:8, count: 2}], null),
          new Cell(8, 14, [0,1,0,1], 'Коридор', null, null),
          new Cell(8, 13, [0,1,0,1], 'Коридор', null, null),
          new Cell(8, 12, [0,1,0,1], 'Коридор', [{name: 'sm', level:9, count: 1},{name: 'sm', level:8, count: 1}], null),
          new Cell(8, 11, [0,1,0,1], 'Коридор', [{name: 'ng', level:8, count: 2},{name: 'sg', level:8, count: 1}], null),
          new Cell(8, 10, [1,0,0,1], 'Коридор', null, null),
          new Cell(8,  9, [0,1,1,0], 'Коридор', [{name: 'sg', level:8, count: 3}], null),
          new Cell(8,  8, [1,0,0,1], 'Коридор', null, null),
          new Cell(8,  7, [0,0,0,1], 'Коридор', null, ['draintop']),
          new Cell(8,  5, [0,1,0,0], 'Коридор', null, ['chest22']),
          new Cell(8,  4, [1,0,1,0], 'Коридор', null, null),
          new Cell(8,  3, [0,1,1,1], 'Коридор', null, ['danger05']),
          new Cell(8,  2, [1,0,1,0], 'Коридор', null, null),

          new Cell(9, 21, [1,1,0,0], 'Коридор', [{name: 'smm', level:8, count: 1},{name: 'rm', level:8, count: 2}], null),
          new Cell(9, 20, [1,0,0,1], 'Коридор', null, ['drainbottom2']),
          new Cell(9, 18, [1,1,0,0], 'Коридор', null, null),
          new Cell(9, 17, [0,1,0,1], 'Коридор', [{name: 'sm', level:8, count: 2}], null),
          new Cell(9, 16, [1,0,0,1], 'Коридор', null, null),
          new Cell(9,  9, [1,0,1,0], 'Коридор', null, null),
          new Cell(9,  8, [1,0,1,1], 'Коридор', null, ['liteLiveFountain']),
          new Cell(9,  4, [1,1,1,0], 'Коридор', null, null),
          new Cell(9,  3, [0,1,0,1], 'Коридор', [{name: 'ng', level:8, count: 2},{name: 'sg', level:8, count: 1},{name: 'lit', level:7, count: 2}], null),
          new Cell(9,  2, [1,0,0,1], 'Коридор', null, null),

          new Cell(10, 21,[1,0,0,0], 'Коридор', null, ['brik']),
          new Cell(10, 11,[0,1,0,0], 'Коридор', null, ['chest121']),
          new Cell(10, 10,[0,1,0,0], 'Коридор', null, null),
          new Cell(10,  9,[1,1,0,1], 'Коридор', [{name: 'bs', level:9, count: 1}], null),
          new Cell(10,  8,[0,0,0,1], 'Коридор', null, null),
          new Cell(10,  7,[0,0,0,1], 'Коридор', null, ['chest2']),
          new Cell(10,  4,[1,0,0,0], 'Коридор', null, ['chest121']),

          new Cell(13, 19,[0,1,0,0], 'Коридор', null, ['probenter']),
          new Cell(13, 18,[0,1,0,1], 'Коридор', [{name: 'rm',level:7,count:7}], null),
          new Cell(13, 17,[0,0,1,1], 'Коридор', null, null),

          new Cell(14, 17,[1,1,0,0], 'Коридор', [{name: 'sl', level:8, count: 2}], null),
          new Cell(14, 16,[0,1,1,1], 'Коридор', [{name: 'sm',level:8,count:2},{name: 'rm',level:7,count:2}], null),
          new Cell(14, 15,[0,1,0,1], 'Коридор', null, null),
          new Cell(14, 14,[0,0,0,1], 'Коридор', null, null),
          new Cell(14, 13,[0,0,0,1], 'Коридор', null, ['memoryFountain']),

          new Cell(15, 17,[1,1,1,0], 'Коридор', null, ['garbage']),
          new Cell(15, 16,[1,0,1,0], 'Коридор', null, null),

          new Cell(16, 19,[0,1,0,0], 'Коридор', null, ['garbage']),
          new Cell(16, 18,[0,1,0,0], 'Коридор', [{name: 'rm',level:8,count:1,alignment: 1}], null),
          new Cell(16, 17,[0,1,1,1], 'Коридор', [{name: 'sl', level:8, count: 2}], null),
          new Cell(16, 16,[1,1,0,1], 'Коридор', [{name: 'sm',level:8,count:2},{name: 'rm',level:8,count:2}], null),
          new Cell(16, 15,[0,1,0,1], 'Коридор', [{name: 'zsl', level:8, count: 1}], null),
          new Cell(16, 14,[0,1,0,1], 'Коридор', null, null),
          new Cell(16, 13,[0,0,1,1], 'Коридор', null, ['skelet12']),

          new Cell(17, 17,[1,0,0,0], 'Коридор', null, null),
          new Cell(17, 16,[1,0,0,1], 'Коридор', null, ['garbage']),
          new Cell(17, 13,[1,0,1,0], 'Коридор', null, null),

          new Cell(18, 13,[1,0,0,0], 'Коридор', null, ['proboina2'])
       ]),

       // 2й этаж
       new Floor(2, [
          new Cell(1, 10, [0,1,0,0], 'Коридор', null, ['ghostFountain']),
          new Cell(1,  9, [0,1,0,0], 'Коридор', [{name: 'sg', level:8, count: 2},{name: 'rg', level:9, count: 2}], null),
          new Cell(1,  8, [0,1,0,1], 'Коридор', null, null),
          new Cell(1,  7, [0,0,1,1], 'Коридор', null, null),
          new Cell(1,  4, [0,1,1,0], 'Коридор', null, null),
          new Cell(1,  3, [0,1,0,1], 'Коридор', [{name: 'ng', level:8, count: 2},{name: 'rg', level:9, count: 1}], null),
          new Cell(1,  2, [0,1,0,1], 'Коридор', null, null),
          new Cell(1,  1, [0,0,0,1], 'Коридор', null, ['drainenter']),

          new Cell(2,  7, [1,1,1,0], 'Коридор', null, null),
          new Cell(2,  6, [0,1,0,1], 'Коридор', [{name: 'stg', level:9, count: 1},{name: 'sg', level:8, count: 2}], null),
          new Cell(2,  5, [0,1,1,1], 'Коридор', null, null),
          new Cell(2,  4, [1,0,1,1], 'Коридор', null, null),

          new Cell(3, 10, [0,1,0,0], 'Коридор', null, ['chestenter']),
          new Cell(3,  9, [0,1,0,0], 'Коридор', null, ['danger02']),
          new Cell(3,  8, [0,1,0,0], 'Коридор', null, null),
          new Cell(3,  7, [1,0,1,1], 'Коридор', null, null),
          new Cell(3,  6, [1,1,1,1], 'Коридор', null, ['altar2']),
          new Cell(3,  5, [1,1,0,0], 'Коридор', null, ['stat3']),
          new Cell(3,  4, [1,0,1,1], 'Коридор', [{name: 'stg', level:9, count: 1},{name: 'sg', level:9, count: 2}], null),
          new Cell(3,  3, [0,1,0,1], 'Коридор', null, ['dangerdem3']),
          new Cell(3,  2, [0,0,0,1], 'Коридор', null, null),
          new Cell(3,  1, [0,0,0,1], 'Коридор', null, ['chest1dem1']),

          new Cell(4,  7, [1,1,1,0], 'Коридор', null, null),
          new Cell(4,  6, [0,0,1,1], 'Коридор', null, ['stat2']),
          new Cell(4,  5, [1,1,1,1], 'Коридор', null, ['altar2']),
          new Cell(4,  4, [1,0,1,0], 'Коридор', null, null),

          new Cell(5, 10, [0,1,0,0], 'Коридор', null, ['altar2']),
          new Cell(5,  9, [0,1,0,0], 'Коридор', [{name: 'sg', level:9, count: 2}], null),
          new Cell(5,  8, [0,1,0,1], 'Коридор', null, null),
          new Cell(5,  7, [1,1,1,1], 'Коридор', [{name: 'stg', level:9, count: 2}], null),
          new Cell(5,  6, [1,1,0,1], 'Коридор', null, null),
          new Cell(5,  5, [0,1,0,1], 'Коридор', null, null),
          new Cell(5,  4, [1,1,1,1], 'Коридор', [{name: 'stg', level:9, count: 2}], null),
          new Cell(5,  3, [0,1,0,1], 'Коридор', null, null),
          new Cell(5,  2, [0,0,0,1], 'Коридор', [{name: 'sg', level:9, count: 2}], null),
          new Cell(5,  1, [0,0,0,1], 'Коридор', null, ['altar2']),

          new Cell(6,  7, [1,0,1,0], 'Коридор', null, null),
          new Cell(6,  4, [1,0,1,0], 'Коридор', null, null),

          new Cell(7, 10, [0,1,0,0], 'Коридор', null, ['antidotFountain']),
          new Cell(7,  9, [0,1,0,0], 'Коридор', null, null),
          new Cell(7,  8, [0,1,0,1], 'Коридор', null, null),
          new Cell(7,  7, [1,0,1,1], 'Коридор', [{name: 'sg', level:9, count: 1},{name: 'sg', level:9, count: 1, alignment:1}], null),
          new Cell(7,  4, [1,1,1,0], 'Коридор', null, null),
          new Cell(7,  3, [0,1,0,1], 'Коридор', null, null),
          new Cell(7,  2, [0,1,0,1], 'Коридор', [{name: 'stg', level:9, count: 2},{name: 'rg', level:9, count: 2}], null),
          new Cell(7,  1, [0,0,0,1], 'Коридор', null, null),

          new Cell(8,  7, [1,0,1,0], 'Коридор', null, null),
          new Cell(8,  6, [0,0,1,1], 'Коридор', null, ['altar2']),
          new Cell(8,  4, [1,0,1,0], 'Коридор', null, null),

          new Cell(9, 10, [0,1,0,0], 'Коридор', null, ['altar21']),
          new Cell(9,  9, [0,1,0,0], 'Коридор', [{name: 'stg', level:9, count: 1,alignment: 1}], null),
          new Cell(9,  8, [0,1,0,1], 'Коридор', null, null),
          new Cell(9,  7, [1,1,0,1], 'Коридор', [{name: 'ep', level:9, count: 1}], null),
          new Cell(9,  6, [0,0,0,1], 'Коридор', null, null),
          new Cell(9,  4, [1,1,1,0], 'Коридор', [{name: 'ng', level:9, count: 1},{name: 'stg', level:9, count: 1},{name: 'sg', level:9, count: 1},{name: 'rg', level:9, count: 1}], null),
          new Cell(9,  3, [0,1,0,1], 'Коридор', null, null),
          new Cell(9,  2, [0,1,0,1], 'Коридор', null, null),
          new Cell(9,  1, [0,0,0,1], 'Коридор', null, ['proboina3']),

          new Cell(10,  7,[1,0,0,0], 'Коридор', null, ['altar2']),
          new Cell(10,  6,[1,0,0,0], 'Коридор', null, ['chest5']),
          new Cell(10,  4,[1,0,0,0], 'Коридор', null, null),
          new Cell(10,  2,[1,0,0,0], 'Коридор', null, ['kkstoneepisk']),

          new Cell(13, 10,[0,0,1,0], 'Коридор', null, ['enterDem22']),
          new Cell(13,  7,[0,1,0,0], 'Коридор', null, ['chest12']),
          new Cell(13,  6,[0,1,1,0], 'Коридор', null, null),
          new Cell(13,  5,[0,0,1,1], 'Коридор', null, null),
          new Cell(13,  3,[0,1,1,0], 'Коридор', null, null),
          new Cell(13,  2,[0,1,0,1], 'Коридор', null, null),
          new Cell(13,  1,[0,0,1,1], 'Коридор', [{name: 'rm', level:9, count: 1},{name: 'smm', level:9, count: 1},{name: 'sm', level:9, count: 1}], null),

          new Cell(14, 10,[1,0,1,0], 'Коридор', [{name: 'sl', level:9, count: 1}], null),
          new Cell(14,  8,[0,0,1,0], 'Коридор', null, null),
          new Cell(14,  6,[1,1,0,0], 'Коридор', null, null),
          new Cell(14,  5,[1,0,1,1], 'Коридор', [{name: 'sm', level:9, count: 1, alignment:1}], null),
          new Cell(14,  3,[1,0,1,0], 'Коридор', null, null),
          new Cell(14,  2,[1,1,1,1], 'Коридор', null, ['garbage']),
          new Cell(14,  1,[1,0,1,0], 'Коридор', null, null),

          new Cell(15, 10,[1,1,1,0], 'Коридор', [{name: 'rm', level:8, count: 2},{name: 'smm', level:9, count: 1}], null),
          new Cell(15,  9,[0,1,0,1], 'Коридор', null, null),
          new Cell(15,  8,[0,0,0,1], 'Коридор', [{name: 'sl', level:9, count: 1}], null),
          new Cell(15,  7,[0,0,0,1], 'Коридор', null, ['garbage']),
          new Cell(15,  5,[1,1,1,0], 'Коридор', null, null),
          new Cell(15,  4,[0,1,0,1], 'Коридор', null, null),
          new Cell(15,  3,[1,0,0,1], 'Коридор', [{name: 'rm', level:9, count: 2}], null),
          new Cell(15,  2,[0,0,0,0], 'Коридор', null, ['stat3']),
          new Cell(15,  1,[1,0,1,0], 'Коридор', null, ['danger03']),

          new Cell(16, 10,[1,0,1,0], 'Коридор', null, ['danger021']),
          new Cell(16,  8,[1,0,0,0], 'Коридор', null, null),
          new Cell(16,  6,[0,1,1,0], 'Коридор', [{name: 'sl', level:9, count: 2}], null),
          new Cell(16,  5,[1,0,0,1], 'Коридор', [{name: 'sl', level:9, count: 2}], null),
          new Cell(16,  3,[1,1,1,0], 'Коридор', null, ['garbage']),
          new Cell(16,  2,[0,1,1,0], 'Коридор', null, null),
          new Cell(16,  1,[0,0,1,1], 'Коридор', null, null),

          new Cell(17, 10,[1,0,1,0], 'Коридор', null, null),
          new Cell(17,  7,[0,1,0,0], 'Коридор', null, ['garbage']),
          new Cell(17,  6,[1,0,1,0], 'Коридор',  [{name: 'rm', level:9, count: 2},{name: 'sm', level:8, count: 2}], null),
          new Cell(17,  3,[0,1,1,0], 'Коридор', null, null),
          new Cell(17,  2,[1,1,0,1], 'Коридор', [{name: 'rm', level:9, count: 2},{name: 'sm', level:9, count: 2}], null),
          new Cell(17,  1,[1,0,1,1], 'Коридор', null, null),

          new Cell(18, 10,[1,1,0,0], 'Коридор', null, ['danger011']),
          new Cell(18,  9,[0,0,1,1], 'Коридор', [{name: 'sl', level:9, count: 3}], null),
          new Cell(18,  6,[1,1,0,0], 'Коридор', null, null),
          new Cell(18,  5,[0,0,1,1], 'Коридор', null, null),
          new Cell(18,  3,[1,0,1,0], 'Коридор', [{name: 'sl', level:9, count: 2}], null),
          new Cell(18,  2,[0,0,0,0], 'Коридор', null, ['danger022']),
          new Cell(18,  1,[1,0,1,0], 'Коридор', null, null),


          new Cell(19,  9,[1,0,1,0], 'Коридор', null, null),
          new Cell(19,  5,[1,0,1,0], 'Коридор', null, null),
          new Cell(19,  3,[1,0,1,0], 'Коридор', [{name: 'hsl', level:9, count: 1}], null),
          new Cell(19,  2,[0,0,0,0], 'Коридор', null, ['garbage']),
          new Cell(19,  1,[1,0,1,0], 'Коридор', [{name: 'rm', level:9, count: 1, alignment:1}], null),

          new Cell(20, 10,[0,1,0,0], 'Коридор', [{name: 'sm', level:9, count: 2}], null),
          new Cell(20,  9,[1,1,1,1], 'Коридор', [{name: 'sl', level:9, count: 1}], null),
          new Cell(20,  8,[0,0,1,1], 'Коридор', null, null),
          new Cell(20,  6,[0,1,1,0], 'Коридор', [{name: 'sl', level:9, count: 1}], null),
          new Cell(20,  5,[1,0,1,1], 'Коридор', null, null),
          new Cell(20,  3,[1,0,1,0], 'Коридор', null, null),
          new Cell(20,  1,[1,0,1,0], 'Коридор', [{name: 'chk', level:9, count: 1}], null),

          new Cell(21, 10,[1,1,0,0], 'Коридор', null, ['ghostPowerFountain']),
          new Cell(21,  9,[1,1,0,0], 'Коридор', null, ['stat1']),
          new Cell(21,  8,[1,1,0,1], 'Коридор', null, null),
          new Cell(21,  7,[0,1,0,1], 'Коридор', [{name: 'rm', level:8, count: 2},{name: 'sm', level:9, count: 1},{name: 'smm', level:9, count: 1}], null),
          new Cell(21,  6,[1,1,0,1], 'Коридор', null, null),
          new Cell(21,  5,[1,0,0,1], 'Коридор', null, null),
          new Cell(21,  4,[0,0,0,0], 'Коридор', null, ['garbage']),
          new Cell(21,  3,[1,0,0,0], 'Коридор', [{name: 'sl', level:9, count: 2}], null),
          new Cell(21,  2,[0,1,0,0], 'Коридор', null, ['kkstonechern']),
          new Cell(21,  1,[1,0,1,0], 'Коридор', null, ['chest51']),

          new Cell(22,  6,[1,0,0,0], 'Коридор', null, ['garbage']),
          new Cell(22,  3,[1,0,0,0], 'Коридор', null, ['chest22']),
          new Cell(22,  1,[1,0,0,0], 'Коридор', null, ['proboina4'])
       ]),

       // 3й этаж
       new Floor(3, [
          new Cell(1, 20, [0,0,1,0], 'Коридор', null, ['enterDem31']),
          new Cell(1, 16, [0,0,1,0], 'Коридор', null, null),
          new Cell(1, 14, [0,1,1,0], 'Коридор', null, ['garbage']),
          new Cell(1, 13, [0,1,1,0], 'Коридор', null, null),
          new Cell(1, 12, [0,1,0,1], 'Коридор', [{name: 'zmb', level:10, count: 1}], null),
          new Cell(1, 11, [0,1,0,1], 'Коридор', null, null),
          new Cell(1, 10, [0,0,1,1], 'Коридор', null, null),
          new Cell(1,  7, [0,0,1,0], 'Коридор', null, ['teleportdem31']),
          new Cell(1,  4, [0,0,1,0], 'Коридор', null, ['garbage']),
          new Cell(1,  2, [0,1,1,0], 'Коридор', null, ['drainbottom2']),
          new Cell(1,  1, [0,0,0,1], 'Коридор', null, ['enterDem32']),

          new Cell(2, 21, [0,1,0,0], 'Коридор', null, null),
          new Cell(2, 20, [1,1,1,1], 'Коридор', null, null),
          new Cell(2, 19, [0,1,0,1], 'Коридор', [{name: 'zmb', level:10, count: 2}], null),
          new Cell(2, 18, [0,1,0,1], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(2, 17, [0,1,0,1], 'Коридор', [{name: 'zmb', level:10, count: 1}], null),
          new Cell(2, 16, [1,0,1,1], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(2, 14, [0,1,1,0], 'Коридор', [{name: 'zmb', level:10, count: 1}], null),
          new Cell(2, 13, [1,0,1,1], 'Коридор', null, null),
          new Cell(2, 10, [1,0,0,0], 'Коридор', null, null),
          new Cell(2,  9, [0,0,0,0], 'Коридор', null, ['barrikadadem3']),
          new Cell(2,  8, [0,1,1,0], 'Коридор', null, ['chestdem32']),
          new Cell(2,  7, [0,0,1,0], 'Коридор', null, ['kkstoneshut']),
          new Cell(2,  6, [0,0,1,1], 'Коридор', null, ['chestdem32']),
          new Cell(2,  5, [0,0,0,0], 'Коридор', null, ['barrikadadem3']),
          new Cell(2,  4, [0,1,0,0], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(2,  3, [0,1,1,1], 'Коридор', null, null),
          new Cell(2,  2, [1,0,0,1], 'Коридор', [{name: 'prok', level:10, count: 2}], null),

          new Cell(3, 20, [1,0,1,0], 'Коридор', [{name: 'zmb', level:10, count: 2}], null),
          new Cell(3, 18, [1,0,1,0], 'Коридор', null, ['garbage']),
          new Cell(3, 16, [1,0,1,0], 'Коридор', [{name: 'zmb', level:10, count: 2}], null),
          new Cell(3, 14, [1,1,1,0], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(3, 13, [1,1,0,1], 'Коридор', null, null),
          new Cell(3, 12, [0,0,1,1], 'Коридор', [{name: 'pp', level:10, count: 2}], null),
          new Cell(3,  8, [0,1,0,0], 'Коридор', null, null),
          new Cell(3,  7, [1,1,1,1], 'Коридор', [{name: 'shp', level:10, count: 1}], null),
          new Cell(3,  6, [0,0,0,1], 'Коридор', null, null),
          new Cell(3,  3, [1,0,1,0], 'Коридор', null, null),
          new Cell(3,  1, [0,0,1,0], 'Коридор', null, ['demFountain31']),

          new Cell(4, 20, [1,0,1,0], 'Коридор', null, null),
          new Cell(4, 18, [0,0,1,0], 'Коридор', null, null),
          new Cell(4, 16, [1,0,1,0], 'Коридор', null, null),
          new Cell(4, 14, [1,0,1,0], 'Коридор', null, null),
          new Cell(4, 12, [1,1,1,0], 'Коридор', [{name: 'zmb', level:10, count: 2}], null),
          new Cell(4, 11, [0,1,0,1], 'Коридор', null, null),
          new Cell(4, 10, [0,0,0,1], 'Коридор', null, null),
          new Cell(4,  9, [0,0,1,1], 'Коридор', null, ['skelet31']),
          new Cell(4,  7, [1,0,1,0], 'Коридор', null, null),
          new Cell(4,  4, [0,1,1,0], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(4,  3, [1,1,0,1], 'Коридор', [{name: 'zmb', level:10, count: 1},{name: 'prok', level:10, count: 1}], null),
          new Cell(4,  2, [0,1,0,1], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(4,  1, [0,0,0,1], 'Коридор', null, null),

          new Cell(5, 20, [1,1,1,0], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(5, 19, [0,1,0,1], 'Коридор', null, null),
          new Cell(5, 18, [1,0,1,1], 'Коридор', [{name: 'zmb', level:10, count: 2}], null),
          new Cell(5, 16, [1,1,0,0], 'Коридор', [{name: 'zmb', level:10, count: 2},{name: 'zmb', level:10, count: 1, alignment:1}], null),
          new Cell(5, 15, [0,1,0,1], 'Коридор', null, null),
          new Cell(5, 14, [1,0,0,1], 'Коридор', [{name: 'zmb', level:10, count: 1, alignment:1}], null),
          new Cell(5, 12, [1,0,1,0], 'Коридор', null, null),
          new Cell(5,  9, [1,1,0,0], 'Коридор', null, null),
          new Cell(5,  8, [0,0,1,0], 'Коридор', null, ['danger04']),
          new Cell(5,  7, [1,0,0,0], 'Коридор', null, ['danger041']),
          new Cell(5,  6, [0,1,0,0], 'Коридор', null, null),
          new Cell(5,  5, [0,1,0,1], 'Коридор', [{name: 'prok', level:10, count: 2}], null),
          new Cell(5,  4, [1,0,1,1], 'Коридор', null, null),
          new Cell(5,  2, [1,0,0,0], 'Коридор', null, ['garbage']),

          new Cell(6, 20, [1,0,0,0], 'Коридор', null, null),
          new Cell(6, 18, [1,0,1,0], 'Коридор', null, null),
          new Cell(6, 12, [1,0,1,0], 'Коридор', null, null),
          new Cell(6,  8, [1,0,1,0], 'Коридор', null, ['drainbottom2']),
          new Cell(6,  6, [1,0,0,0], 'Коридор', null, ['garbage']),
          new Cell(6,  4, [1,0,1,0], 'Коридор', [{name: 'zmb', level:10, count: 2}], null),
          new Cell(6,  3, [0,0,0,1], 'Коридор', null, ['garbage']),
          new Cell(6,  1, [0,0,1,0], 'Коридор', null, ['chestdem31']),

          new Cell(7, 20, [1,0,0,0], 'Коридор', null, ['garbage']),
          new Cell(7, 18, [1,0,1,0], 'Коридор', null, null),
          new Cell(7, 16, [0,0,1,0], 'Коридор', null, null),
          new Cell(7, 15, [0,0,0,1], 'Коридор', null, ['chestdem32']),
          new Cell(7, 14, [0,1,0,0], 'Коридор', null, null),
          new Cell(7, 13, [0,1,0,1], 'Коридор', null, null),
          new Cell(7, 12, [1,1,1,1], 'Коридор', [{name: 'proksk', level:10, count: 2},{name: 'zmb', level:10, count: 1}], null),
          new Cell(7, 11, [0,1,0,1], 'Коридор', null, null),
          new Cell(7, 10, [0,1,0,1], 'Коридор', null, null),
          new Cell(7,  9, [0,1,0,1], 'Коридор', [{name: 'prok', level:10, count: 1},{name: 'zmb', level:10, count: 2}], null),
          new Cell(7,  8, [1,1,0,1], 'Коридор', null, null),
          new Cell(7,  7, [0,0,1,1], 'Коридор', null, null),
          new Cell(7,  5, [0,1,0,0], 'Коридор', null, null),
          new Cell(7,  4, [1,0,1,1], 'Коридор', [{name: 'bzmb', level:10, count: 1}], null),
          new Cell(7,  2, [0,1,1,0], 'Коридор', null, ['dangerdem3']),
          new Cell(7,  1, [0,0,0,1], 'Коридор', null, null),

          new Cell(8, 20, [0,1,0,0], 'Коридор', null, null),
          new Cell(8, 19, [0,1,1,1], 'Коридор', [{name: 'zmb', level:10, count: 1, alignment:1}], null),
          new Cell(8, 18, [1,0,0,1], 'Коридор', null, null),
          new Cell(8, 16, [1,0,1,0], 'Коридор', [{name: 'prp', level:10, count: 1}], null),
          new Cell(8, 15, [1,0,1,1], 'Коридор', null, ['fountdem31']),
          new Cell(8, 14, [1,0,0,0], 'Коридор', null, ['garbage']),
          new Cell(8, 12, [1,0,1,0], 'Коридор', null, null),
          new Cell(8,  9, [1,0,1,0], 'Коридор', null, ['barrikadadem3']),
          new Cell(8,  7, [1,0,0,0], 'Коридор', null, ['garbage']),
          new Cell(8,  4, [1,0,1,0], 'Коридор', null, ['drainbottom2']),
          new Cell(8,  3, [0,1,1,1], 'Коридор', null, ['garbage']),
          new Cell(8,  2, [1,0,1,0], 'Коридор', null, null),

          new Cell(9, 20, [1,1,0,0], 'Коридор', null, ['chest02dem3']),
          new Cell(9, 19, [1,0,1,0], 'Коридор', null, null),
          new Cell(9, 16, [1,0,1,0], 'Коридор', null, null),
          new Cell(9, 15, [1,0,1,1], 'Коридор', null, ['proboina5']),
          new Cell(9, 12, [1,0,1,0], 'Коридор', null, ['drainbottom2']),
          new Cell(9,  9, [0,0,1,0], 'Коридор', null, null),
          new Cell(9,  6, [0,1,1,0], 'Коридор', null, ['drainbottom2'] ),
          new Cell(9,  5, [0,1,0,1], 'Коридор', null, null),
          new Cell(9,  4, [1,1,0,1], 'Коридор', [{name: 'zmb', level:10, count: 2},{name: 'prok', level:10, count: 1}], null),
          new Cell(9,  3, [0,1,0,1], 'Коридор', null, null),
          new Cell(9,  2, [1,0,1,1], 'Коридор', [{name: 'trp', level:10, count: 1}], null),

          new Cell(10, 19,[1,1,0,0], 'Коридор', null, ['enterDem33']),
          new Cell(10, 18,[0,1,0,1], 'Коридор', null, null),
          new Cell(10, 17,[0,1,0,1], 'Коридор', null, null),
          new Cell(10, 16,[1,1,0,1], 'Коридор', [{name: 'zmb', level:10, count: 2},{name: 'prok', level:10, count: 1}], null),
          new Cell(10, 15,[0,1,0,1], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(10, 14,[0,1,0,1], 'Коридор', [{name: 'bzmb', level:10, count: 1}], null),
          new Cell(10, 13,[0,1,0,1], 'Коридор', [{name: 'prok', level:10, count: 2}], null),
          new Cell(10, 12,[1,1,0,1], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(10, 11,[0,1,0,1], 'Коридор', null, ['drainbottom2']),
          new Cell(10, 10,[0,1,0,1], 'Коридор', [{name: 'prok', level:10, count: 2}], null),
          new Cell(10,  9,[1,1,0,1], 'Коридор', null, null),
          new Cell(10,  8,[0,1,0,1], 'Коридор', [{name: 'pp', level:10, count: 1}], null),
          new Cell(10,  7,[0,1,0,1], 'Коридор', [{name: 'prok', level:10, count: 2}], null),
          new Cell(10,  6,[1,0,0,1], 'Коридор', null, null),
          new Cell(10,  4,[1,0,0,0], 'Коридор', null, ['barrikadadem3']),
          new Cell(10,  2,[1,0,0,0], 'Коридор', null, null),
          new Cell(10,  1,[0,0,0,1], 'Коридор', null, ['garbage'])
       ]),

       // 4й этаж
       new Floor(4, [
          new Cell(0,  1, [0,0,1,0], 'Коридор', [{name: 'vilgol', level:11, count: 1}], ['kuzndem']),

          new Cell(1, 10, [0,0,1,0], 'Коридор', [{name: 'zmb', level:10, count: 2, alignment:1}], null),
          new Cell(1,  9, [0,1,1,1], 'Коридор', null, ['lab2']),
          new Cell(1,  8, [0,0,1,0], 'Коридор', [{name: 'zmb', level:10, count: 2, alignment:1}], null),
          new Cell(1,  4, [0,0,0,0], 'Коридор', null, ['gobelin03']),
          new Cell(1,  3, [0,1,1,0], 'Коридор', null, ['chestdem41']),
          new Cell(1,  2, [0,1,1,0], 'Коридор', null, ['danger07']),
          new Cell(1,  1, [0,0,1,1], 'Коридор', null, null),

          new Cell(2, 10, [1,1,1,0], 'Коридор', [{name: 'zmb', level:10, count: 2, alignment:1}], null),
          new Cell(2,  9, [0,1,1,1], 'Коридор', [{name: 'drs', level:10, count: 1}], null),
          new Cell(2,  8, [1,0,1,1], 'Коридор', [{name: 'zmb', level:10, count: 2, alignment:1}], null),
          new Cell(2,  4, [0,0,0,0], 'Коридор', null, ['throne01']),
          new Cell(2,  3, [0,1,0,0], 'Коридор', [{name: 'pk', level:10, count: 1}], null),
          new Cell(2,  2, [1,1,1,1], 'Коридор', null, ['danger07']),
          new Cell(2,  1, [1,0,1,1], 'Коридор', null, ['vumpel01']),

          new Cell(3, 10, [1,1,1,0], 'Коридор', [{name: 'prok', level:10, count: 1, alignment:1}], null),
          new Cell(3,  9, [1,1,1,1], 'Коридор', null, null),
          new Cell(3,  8, [1,0,1,1], 'Коридор', [{name: 'prok', level:10, count: 1, alignment:1}], null),
          new Cell(3,  4, [0,0,0,0], 'Коридор', null, ['gobelin02']),
          new Cell(3,  3, [1,1,0,0], 'Коридор', null, ['chestdem42']),
          new Cell(3,  2, [1,1,0,0], 'Коридор', null, null),
          new Cell(3,  1, [1,0,1,1], 'Коридор', null, null),

          new Cell(4, 10, [1,1,0,0], 'Коридор', null, null),
          new Cell(4,  9, [1,1,1,1], 'Коридор', [{name: 'prok', level:10, count: 2, alignment:1}], null),
          new Cell(4,  8, [1,0,0,1], 'Коридор', null, null),
          new Cell(4,  1, [1,0,0,0], 'Коридор', null, null),

          new Cell(5,  9, [1,0,1,0], 'Коридор', [{name: 'bzmb', level:10, count: 1}], null),
          new Cell(5,  4, [0,1,1,0], 'Коридор', [{name: 'drs', level:10, count: 1, alignment:1}], null),
          new Cell(5,  3, [0,1,1,1], 'Коридор', null, null),
          new Cell(5,  2, [0,1,1,1], 'Коридор', [{name: 'drs', level:10, count: 1, alignment:1}], null),
          new Cell(5,  1, [0,0,1,1], 'Коридор', null, ['door3']),

          new Cell(6,  9, [1,1,1,0], 'Коридор', [{name: 'prok', level:10, count: 3, alignment:1}], null),
          new Cell(6,  8, [0,0,0,1], 'Коридор', null, null),
          new Cell(6,  7, [0,0,0,1], 'Коридор', null, ['altar2']),
          new Cell(6,  6, [0,1,1,0], 'Коридор', null, null),
          new Cell(6,  5, [0,1,0,1], 'Коридор', null, null),
          new Cell(6,  4, [1,1,1,1], 'Коридор', null, null),
          new Cell(6,  3, [1,1,1,1], 'Коридор', null, null),
          new Cell(6,  2, [1,1,1,1], 'Коридор', null, null),
          new Cell(6,  1, [1,0,0,1], 'Коридор', [{name: 'drs', level:10, count: 1, alignment:1}], null),

          new Cell(7,  9, [1,0,1,0], 'Коридор', [{name: 'bzmb', level:10, count: 1}], null),
          new Cell(7,  6, [1,0,1,0], 'Коридор', [{name: 'prok', level:10, count: 2, alignment:1}], null),
          new Cell(7,  4, [1,1,0,0], 'Коридор', [{name: 'drs', level:10, count: 1, alignment:1}], null),
          new Cell(7,  3, [1,1,0,1], 'Коридор', null, null),
          new Cell(7,  2, [1,0,0,1], 'Коридор', [{name: 'drs', level:10, count: 1, alignment:1}], null),
          new Cell(7,  1, [1,0,0,1], 'Коридор', null, ['chestdem43']),

          new Cell(8,  9, [1,1,1,0], 'Коридор', [{name: 'prok', level:10, count: 3, alignment:1}], null),
          new Cell(8,  8, [0,1,0,1], 'Коридор', null, null),
          new Cell(8,  7, [0,1,1,1], 'Коридор', [{name: 'bzmb', level:10, count: 1}], null),
          new Cell(8,  6, [1,0,0,1], 'Коридор', null, null),
          new Cell(8,  4, [0,1,1,0], 'Коридор', null, null),
          new Cell(8,  3, [0,1,1,1], 'Коридор', [{name: 'drs', level:10, count: 1}], null),
          new Cell(8,  2, [0,1,1,1], 'Коридор', null, null),
          new Cell(8,  1, [0,0,0,1], 'Коридор', [{name: 'drs', level:10, count: 1}], null),

          new Cell(9,  9, [1,0,1,0], 'Коридор', null, null),
          new Cell(9,  7, [1,0,1,0], 'Коридор', null, null),
          new Cell(9,  4, [1,1,1,0], 'Коридор', [{name: 'drs', level:10, count: 1}], null),
          new Cell(9,  3, [1,1,1,1], 'Коридор', null, null),
          new Cell(9,  2, [1,0,1,1], 'Коридор', null, ['danger06']),
          new Cell(9,  1, [1,0,1,1], 'Коридор', null, ['altar4']),

          new Cell(10, 10,[0,1,0,0], 'Коридор', null, ['enterDem41']),
          new Cell(10,  9,[1,1,0,1], 'Коридор', [{name: 'bzmb', level:10, count: 1}], null),
          new Cell(10,  8,[0,0,0,1], 'Коридор', null, null),
          new Cell(10,  7,[1,1,0,0], 'Коридор', [{name: 'bzmb', level:10, count: 1}], null),
          new Cell(10,  6,[0,1,0,1], 'Коридор', [{name: 'prok', level:10, count: 2, alignment:1}], null),
          new Cell(10,  5,[0,1,0,1], 'Коридор', null, null),
          new Cell(10,  4,[1,1,0,1], 'Коридор', null, null),
          new Cell(10,  3,[1,1,0,1], 'Коридор', [{name: 'drs', level:10, count: 1}], null),
          new Cell(10,  2,[1,1,0,1], 'Коридор', null, null),
          new Cell(10,  1,[0,0,0,1], 'Коридор', [{name: 'drs', level:10, count: 1}], null)
       ])
   ])
]);
