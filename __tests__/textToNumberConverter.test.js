import { test, expect } from 'vitest';
import { TextToNumberConverter } from '../js/textToNumberConverter';
import { sizeCoefficient } from '../js/constants';

test('テキストを数値に変換', () => {
    const converter = new TextToNumberConverter(37, 46, "AI1回行動", "無し");
    expect(converter.ai).toEqual(1);
    expect(converter.size).toEqual(sizeCoefficient.S);
    expect(converter.levelBonus).toEqual(46);
    expect(converter.hasSparkingBonus).toEqual({
        hp: false,
        mp: false,
        atk: false,
        def: false,
        spd: false,
        wisdom: false
    });
});

test('キラキラ有り:HP', () => {
    const converter = new TextToNumberConverter(37, 46, "AI1回行動", "HP");
    expect(converter.ai).toEqual(1);
    expect(converter.size).toEqual(sizeCoefficient.S);
    expect(converter.levelBonus).toEqual(46);
    expect(converter.hasSparkingBonus).toEqual({
        hp: true,
        mp: false,
        atk: false,
        def: false,
        spd: false,
        wisdom: false
    });
});

const aiTestCases = [
    { aiText: "AI1回行動", expected: 1 },
    { aiText: "AI1～2回行動", expected: 0.9 },
    { aiText: "AI2回行動", expected: 0.8 },
    { aiText: "AI1～3回行動", expected: 0.8 },
    { aiText: "AI2～3回行動", expected: 0.7 },
];

aiTestCases.forEach(({ aiText, expected }) => {
    test(`AI: ${aiText}`, () => {
        const converter = new TextToNumberConverter(37, 46, aiText, "無し");
        expect(converter.ai).toEqual(expected);
    });
});

const sizeTestCases = [
    { sizeNumber: 1, expected: sizeCoefficient.S },
    { sizeNumber: 50, expected: sizeCoefficient.S },
    { sizeNumber: 51, expected: sizeCoefficient.L },
    { sizeNumber: 100, expected: sizeCoefficient.L },
];

sizeTestCases.forEach(({ sizeNumber, expected }) => {
    test(`サイズ: ${sizeNumber}`, () => {
        const converter = new TextToNumberConverter(sizeNumber, 46, "AI1回行動", "無し");
        expect(converter.size).toEqual(expected);
    });
});

test('1未満のサイズはエラー', () => {
    expect(() => {
        new TextToNumberConverter(0, 46, "AI1回行動", "無し").size;
    }).toThrow("サイズ数が不正です");
});


test('100より大きいサイズはエラー', () => {
    expect(() => {
        new TextToNumberConverter(101, 46, "AI1回行動", "無し").size;
    }).toThrow("サイズ数が不正です");
});