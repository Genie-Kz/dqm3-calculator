//@ts-check
import { lineageCoefficient, statusLabels, lineageLabels } from "./constants.js";

export class FamilyTree {
    /**
     * 両親の系図
     * @type {Number[]}
     */
    parents;
    /**
     * 祖父母の系図
     * @type {Number[]}
     */
    grandParents;
    constructor(parents, grandParents) {
        this.parents = parents;
        this.grandParents = grandParents;
    }

    /**
     *　@type {{[key in keyof typeof statusLabels]: Number}}
     */
    get lineageBonus() {
        let parentsBonus = {};
        let grandParentsBonus = {};

        // 系統ボーナスの計算
        // 両親の係数は2、祖父母の係数は1
        for (const label in statusLabels) {
            parentsBonus[label] = this.parents.filter(parent => lineageCoefficient[parent][label]).length * 2;
            grandParentsBonus[label] = this.grandParents.filter(grandParent => lineageCoefficient[grandParent][label]).length;
        }

        const result = {};
        const isNoDuplicatesLineage = this.#isNoDuplicatesLineage();

        // 祖父母の系統に重複がなければ、係数に2を足す
        for (const label in statusLabels) {
            result[label] = parentsBonus[label] + grandParentsBonus[label] + (isNoDuplicatesLineage ? 2 : 0);
        }
        return result;
    }

    // grandParentsの重複チェック
    /**
     * @returns {Boolean}
     */
    #isNoDuplicatesLineage() {
        return this.grandParents.length == new Set(this.grandParents).size;
    }
}