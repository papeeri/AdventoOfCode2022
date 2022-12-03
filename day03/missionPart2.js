// https://adventofcode.com/2022/day/3

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day03/input.txt";

function parser(inputData) {
    return inputData.split(/\r?\n/);
}

function mission() {
    const rucksacks = getInputData(_inputPath)(parser);

    let items = [];

    for (let r = 0; r < rucksacks.length; r = r + 3) {
        for (let i = 0; i < rucksacks[r].length; i++) {
            let charAtIndex = rucksacks[r].charAt(i);
            if (rucksacks[r + 1].includes(charAtIndex) && rucksacks[r + 2].includes(charAtIndex)) {
                items.push(charAtIndex);
                break;
            }
        }
    }

    let sumOfPriorities = 0;
    items.map((c) => {
        let priority = getPriority(c);
        sumOfPriorities += priority;
    });

    console.log("Sum of priorities:", sumOfPriorities);
}

function getPriority(c) {
    if (isUpperCase(c)) {
        return c.charCodeAt(0) - 64 + 26;
    }

    return c.charCodeAt(0) - 96;
}

function isUpperCase(c) {
    return c == c.toUpperCase();
}

mission();
