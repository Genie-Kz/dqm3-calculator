//@ts-check

import { monsters } from "./monsters.js";
import { aiCoefficient } from "./constants.js";

export class Monster {
    monsters = monsters;
    hp = 0;
    mp = 0;
    atk = 0;
    def = 0;
    spd = 0;
    wisdom = 0;
    /**
     * @type {"S" | "L"}
     */
    #size = "S";
    #sizeSAttributes;
    #sizeLAttributes;
    constructor(name) {
        this.name = name;
        const monster = this.monsters.find(x => x.name == name);
        if (monster == null) {
            throw new Error("モンスターが存在しません");
        }
        this.hp = monster.hp;
        this.mp = monster.mp;
        this.atk = monster.atk;
        this.def = monster.def;
        this.spd = monster.spd;
        this.wisdom = monster.wisdom;
        this.#sizeSAttributes = monster.sizeSAttributes;
        this.#sizeLAttributes = monster.sizeLAttributes;
    }

    /**
     * @param {"S" | "L"} size
     */
    set size(size) {
        if (size == "S" || size == "L") {
            this.#size = size;
            return;
        }
        throw new Error("サイズはSかLで指定してください");
    }

    get size() {
        return this.#size;
    }

    /**
     * @type{ keyof typeof aiCoefficient }
     */
    get aiText() {
        const currentAttributes = this.size == "S" ? [...this.#sizeSAttributes] : [...this.#sizeSAttributes, ...this.#sizeLAttributes];
        const aiList = Object.keys(aiCoefficient);
        for (const currentAttribute of currentAttributes) {
            if (aiList.includes(currentAttribute)) {
                return currentAttribute;
            }
        }
        return "AI1回行動";
    }
}
