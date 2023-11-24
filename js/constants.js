export const aiCoefficient = {
    "AI1回行動": 1,
    "AI1～2回行動": 0.9,
    "AI2回行動": 0.8,
    "AI1～3回行動": 0.8,
    "AI2～3回行動": 0.7,
};

// copilot調教
// hp-> H mp -> M atk -> A def -> D spd -> S wisdom -> W
// と略記し 例えばHMAとすると
// hpが1倍 mpが1倍 atkが1倍 defが0倍 spdが0倍 wisdomが0倍となる
// HMWは？
// hpが1倍 mpが1倍 atkが0倍 defが0倍 spdが0倍 wisdomが1倍となる
export const lineageCoefficient = {
    "???": {
        // HAW
        hp: 1,
        mp: 0,
        atk: 1,
        def: 0,
        spd: 0,
        wisdom: 1,
    },
    "悪魔": {
        // MAD
        hp: 0,
        mp: 1,
        atk: 1,
        def: 1,
        spd: 0,
        wisdom: 0,
    },
    "自然": {
        //DSW
        hp: 0,
        mp: 0,
        atk: 0,
        def: 1,
        spd: 1,
        wisdom: 1,
    },
    "スライム": {
        // HSW
        hp: 1,
        mp: 0,
        atk: 0,
        def: 0,
        spd: 1,
        wisdom: 1,
    },
    "ゾンビ": {
        // HMS
        hp: 1,
        mp: 1,
        atk: 0,
        def: 0,
        spd: 1,
        wisdom: 0,
    },
    "ドラゴン": {
        // HMA
        hp: 1,
        mp: 1,
        atk: 1,
        def: 0,
        spd: 0,
        wisdom: 0,
    },
    "物質": {
        // ADW
        hp: 0,
        mp: 0,
        atk: 1,
        def: 1,
        spd: 0,
        wisdom: 1,
    },
    "魔獣": {
        // MDS
        hp: 0,
        mp: 1,
        atk: 0,
        def: 1,
        spd: 1,
        wisdom: 0,
    }
};

export const sparkling = 100;

export const statusLabels = {
    hp: "HP",
    mp: "MP",
    atk: "攻撃力",
    def: "守備力",
    spd: "素早さ",
    wisdom: "賢さ",
};

export const lineageLabels = {
    "unknown": "???",
    "demon": "悪魔",
    "nature": "自然",
    "slime": "スライム",
    "zonbie": "ゾンビ",
    "dragon": "ドラゴン",
    "material": "物質",
    "beast": "魔獣",
};

export const sizeCoefficient = {
    'S': {
        hp: 1.0,
        mp: 1.0,
        atk: 1.0,
        def: 1.0,
        spd: 1.0,
        wisdom: 1.0,
    },
    'L': {
        hp: 1.5,
        mp: 1.5,
        atk: 1.1,
        def: 1.1,
        spd: 1.1,
        wisdom: 1.1,
    }
}