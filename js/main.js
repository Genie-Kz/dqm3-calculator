//@ts-check

import { FamilyTree } from "./familyTree.js";
import { Monster } from "./monster.js";
import { TextToNumberConverter } from "./textToNumberConverter.js";
import { sparkling, statusLabels } from "./constants.js";

class Application {
    sizeNumberElem = document.getElementById('size-number');
    familyTreeElem = document.getElementById('family-tree');
    monsterInfoElem = document.getElementById('monster-info');
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
        this.sizeNumberElem.addEventListener('change', this.handleSizeTextChange);
        this.monsterInfoElem.addEventListener('change', this.updateStatus);
        this.familyTreeElem.addEventListener('change', this.updateStatus);
    }

    /**
     * サイズ数を基にLかSかを設定
     */
    handleSizeTextChange() {
        this.sizeNumberElem = document.getElementById('size-number');
        const sizeText = document.getElementById('size-text');
        if (this.sizeNumberElem.value > 50) {
            sizeText.textContent = 'L';
        } else if (1 <= this.sizeNumberElem.value && this.sizeNumberElem.value <= 50) {
            sizeText.textContent = 'S';
        } else {
            sizeText.textContent = '';
        }
    }

    updateStatus = () => {
        const monster = new Monster(document.getElementById('monster-name').value);
        const familyTree = new FamilyTree(
            this.getParentsFamilyTree(),
            this.getGrandParentFamilyTree()
        );
        const converter = new TextToNumberConverter(
            this.sizeNumberElem.value,
            document.getElementById('level-bonus').value,
            document.getElementById('ai-text').value,
            document.getElementById('sparkling-bonus').value
        );

        for (const label in statusLabels) {
            this.calculatedElems[label].textContent =
                Math.trunc(
                    Math.ceil(
                        monster[label] * converter.size[label] * converter.ai) *
                    (1 + (converter.levelBonus * familyTree.lineageBonus[label]) * 0.0001) +
                    (converter.hasSparkingBonus[label] ? sparkling : 0)) +
                (label === 'def' ? converter.sizeNumber - 50 :
                    label === 'spd' ? 50 - converter.sizeNumber : 0);
        }
    }

    getParentsFamilyTree() {
        return this.getFamilyTree('.parent');
    }

    getGrandParentFamilyTree() {
        return this.getFamilyTree('.grand-parent');
    }

    getFamilyTree(selector) {
        const result = [];
        document.querySelectorAll(selector).forEach((elem) => {
            result.push(elem.value);
        });
        return result;
    }
}

const app = new Application();
window.addEventListener('load', () => {
    app.start();
    app.updateStatus();
    console.log(app.familyTreeElem)
    console.log(app.monsterInfoElem);
});
