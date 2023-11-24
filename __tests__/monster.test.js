import { expect, test } from 'vitest';
import { Monster } from '../js/monster';

test('モンスターが存在しない場合エラーが発生する', () => {
    expect(() => new Monster('ほげ')).toThrowError('モンスターが存在しません');
});

test('モンスターの情報を取得', () => {
    expect(() => {
        const riri = new Monster('リリパット')
        riri.hp.expect(1410);
        riri.mp.expect(460);
        riri.atk.expect(420);
        riri.def.expect(500);
        riri.spd.expect(460);
        riri.wisdom.expect(340);
    });
});