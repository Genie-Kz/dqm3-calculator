//@ts-check

import { aiCoefficient, statusLabels, sizeCoefficient } from "./constants.js";

export class TextToNumberConverter {
    /**
     * @type {Number}
     */
    #sizeNumber;
    /**
     * @type {Number}
     */
    #levelBonus;
    /**
     * @type {keyof aiCoefficient}
     */
    #aiText;
    /**
     * @type {"無し" | "HP" | "MP" | "攻撃" | "防御" | "素早さ" | "賢さ"}
     */
    #sparkingBonusText;

    /**
     * @param {Number} sizeNumber
     * @param {Number} levelBonus
     * @param {keyof aiCoefficient} aiText
     * @param {"無し" | "HP" | "MP" | "攻撃" | "防御" | "素早さ" | "賢さ"} sparkingBonusText
     */
    constructor(sizeNumber, levelBonus, aiText, sparkingBonusText) {
        this.#sizeNumber = Math.trunc(sizeNumber);
        this.#levelBonus = levelBonus;
        this.#aiText = aiText;
        this.#sparkingBonusText = sparkingBonusText;
    }

    /**
     * @type {Number}
     */
    get ai() {
        if (this.#aiText in aiCoefficient) {
            return aiCoefficient[this.#aiText];
        }
        throw new Error("AIが存在しません");
    }

    /**
     * @type {{[key in keyof typeof statusLabels]: Boolean}}
     */
    get hasSparkingBonus() {
        const result = {};
        for (const label in statusLabels) {
            result[label] = statusLabels[label] === this.#sparkingBonusText;
        }

        return result;
    }

    /**
     * @type {Object}
     */
    get size() {
        if (50 < this.#sizeNumber && this.#sizeNumber <= 100) {
            return sizeCoefficient["L"];
        } else if (0 < this.#sizeNumber && this.#sizeNumber <= 50) {
            return sizeCoefficient["S"];
        }
        throw new Error("サイズ数が不正です");
    }

    get sizeNumber() {
        return this.#sizeNumber;
    }
    /**
     * @type {Number}
     */
    get levelBonus() {
        return this.#levelBonus;
    }
}