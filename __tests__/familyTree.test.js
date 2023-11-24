import { test, expect } from 'vitest';
import { FamilyTree } from '../js/familyTree';

test('祖父母の系統に重複がない場合、系統ボーナスに2が加算される', () => {
    const familyTree = new FamilyTree(["自然", "悪魔"], ["魔獣", "スライム", "悪魔", "自然"]);
    expect(familyTree.lineageBonus).toEqual({
        hp: 3,
        mp: 6,
        atk: 5,
        def: 9,
        spd: 7,
        wisdom: 6
    });
});