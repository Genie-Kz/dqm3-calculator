//@ts-check

import { FamilyTree } from "./familyTree.js";
import { Monster } from "./monster.js";
import { TextToNumberConverter } from "./textToNumberConverter.js";
import { sparkling, statusLabels } from "./constants.js";
import { monsters } from "./monsters.js";

/**
 * 全体を管理
 */
class Application {
    /** @type {HTMLInputElement} */
    sizeNumberElem = document.getElementById('size-number');
    /** @type {HTMLElement} */
    familyTreeElem = document.getElementById('family-tree');
    /** @type {HTMLElement} */
    monsterInfoElem = document.getElementById('monster-info');
    monster = new Monster(document.getElementById('monster-name').value);

    // 基礎ステータスの要素
    baseElems = {
        hp: document.getElementById('base-status-hp'),
        mp: document.getElementById('base-status-mp'),
        atk: document.getElementById('base-status-atk'),
        def: document.getElementById('base-status-def'),
        spd: document.getElementById('base-status-spd'),
        wisdom: document.getElementById('base-status-wisdom'),
    }

    // 計算結果の要素
    calculatedElems = {
        hp: document.getElementById('calculated-status-hp'),
        mp: document.getElementById('calculated-status-mp'),
        atk: document.getElementById('calculated-status-atk'),
        def: document.getElementById('calculated-status-def'),
        spd: document.getElementById('calculated-status-spd'),
        wisdom: document.getElementById('calculated-status-wisdom'),
    }

    start() {
        // サイズ係数の変動を実際サイズに反映
        this.sizeNumberElem.addEventListener('change', this.handleSizeTextChange);

        // 種族情報・系図の変動をステータス更新
        this.monsterInfoElem.addEventListener('change', this.#updateStatus);
        this.familyTreeElem.addEventListener('change', this.#updateStatus);

        // 初期値設定
        this.#updateStatus();
    }

    /**
     * サイズ数を基にLかSかを設定
     */
    handleSizeTextChange = () => {
        this.sizeNumberElem = document.getElementById('size-number');
        const sizeText = document.getElementById('size-text');
        sizeText.textContent = this.#getCurrentSize();
    }

    /**
     * 現在のサイズを取得
     * @returns {"S" | "L"}
     */
    #getCurrentSize = () => {
        if (this.sizeNumberElem.value > 50) {
            return 'L';
        } else if (1 <= this.sizeNumberElem.value && this.sizeNumberElem.value <= 50) {
            return 'S';
        }
        throw new Error('サイズ数が不正です');
    }

    /**
     * 最終値を更新
     */
    #updateStatus = () => {
        this.monster = new Monster(document.getElementById('monster-name').value);
        this.monster.size = this.#getCurrentSize();

        // 系図
        const familyTree = new FamilyTree(
            this.#getParentsFamilyTree(),
            this.#getGrandParentFamilyTree()
        );

        // 行動回数を更新
        document.getElementById('ai-text').textContent = this.monster.aiText;

        // 基礎ステータスの更新
        for (const label in statusLabels) {
            this.baseElems[label].textContent = this.monster[label];
        }

        // 種族情報から計算に必要なテキスト取得
        const converter = new TextToNumberConverter(
            this.sizeNumberElem.value,
            document.getElementById('level-bonus').value,
            this.monster.aiText,
            document.getElementById('sparkling-bonus').value
        );

        // 最終値の更新
        for (const label in statusLabels) {
            this.calculatedElems[label].textContent =
                Math.trunc(
                    Math.ceil(
                        this.monster[label] * converter.size[label] * converter.ai) *
                    (1 + (converter.levelBonus * familyTree.lineageBonus[label]) * 0.0001) +
                    (converter.hasSparkingBonus[label] ? sparkling : 0)) +
                (label === 'def' ? converter.sizeNumber - 50 :
                    label === 'spd' ? 50 - converter.sizeNumber : 0);
        }
    }

    #getParentsFamilyTree() {
        return this.#getFamilyTree('.parent');
    }

    #getGrandParentFamilyTree() {
        return this.#getFamilyTree('.grand-parent');
    }

    #getFamilyTree(selector) {
        const result = [];
        document.querySelectorAll(selector).forEach((elem) => {
            result.push(elem.value);
        });
        return result;
    }
}

const app = new Application();
window.addEventListener('load', () => {
    addMonsterOptions();
    app.start();
});

// TODO: 描画用のクラスを作る
function addMonsterOptions() {
    /**
     * @type {HTMLSelectElement}
     */
    const monsterListElem = document.getElementById('monster-name-list');
    for (const monster of monsters) {
        const option = document.createElement('option');
        option.value = monster.name;
        monsterListElem.appendChild(option);
    }
}