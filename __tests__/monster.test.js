import { expect, test } from 'vitest';
import { Monster } from '../js/monster';

test('モンスターが存在しない場合エラーが発生する', () => {
    expect(() => new Monster('ほげ')).toThrowError('モンスターが存在しません');
});

test('モンスターの情報を取得', () => {
    expect(() => {
        const monster = new Monster('リリパット')
        monster.hp.expect(1410);
        monster.mp.expect(460);
        monster.atk.expect(420);
        monster.def.expect(500);
        monster.spd.expect(460);
        monster.wisdom.expect(340);
    });
});

test('SカL以外のサイズを指定した場合エラーが発生する', () => {
    expect(() => {
        const monster = new Monster('リリパット');
        monster.size = 'M';
    }).toThrowError('サイズはSかLで指定してください');
});

test('SまたはLにサイズ変更ができる', () => {
    const monster = new Monster('リリパット');
    monster.size = 'L';
    expect(monster.size).toEqual('L');
    monster.size = 'S';
    expect(monster.size).toEqual('S');
});


const sizeSAITestCases = [
    { monsterName: 'リリパット', expected: 'AI1回行動' },
    { monsterName: 'スカルライダー', expected: 'AI1～2回行動' },
];

sizeSAITestCases.forEach(({ monsterName, expected }) => {
    test(`SサイズのモンスターのAIを取得:${monsterName}: ${expected}`, () => {
        const monster = new Monster(monsterName);
        expect(monster.aiText).toEqual(expected);
    });
});

const sizeLAITestCases = [
    { monsterName: 'シャイニング', expected: 'AI1～2回行動' },
    { monsterName: 'テールイーター', expected: 'AI1～3回行動' },
    { monsterName: 'チョコゴーレム', expected: 'AI2回行動' },
    { monsterName: 'とらおとこ', expected: 'AI2～3回行動' },
];

sizeLAITestCases.forEach(({ monsterName, expected }) => {
    test(`LサイズのモンスターのAIを取得:${monsterName}: ${expected}`, () => {
        const monster = new Monster(monsterName);
        monster.size = 'L';
        expect(monster.aiText).toEqual(expected);
    });
});