//@ts-check

import { monsters } from "./monsters.js";

export class Monster {
    monsters = monsters;
    hp = 0;
    mp = 0;
    atk = 0;
    def = 0;
    spd = 0;
    wisdom = 0;

    constructor(name) {
        this.name = name;
        const monster = this.monsters.find(x => x.name == name);
        if (this.monsters.find(x => x.name == name) == null) {
            throw new Error("モンスターが存在しません");
        }
        this.hp = monster.hp;
        this.mp = monster.mp;
        this.atk = monster.atk;
        this.def = monster.def;
        this.spd = monster.spd;
        this.wisdom = monster.wisdom;
    }
}
