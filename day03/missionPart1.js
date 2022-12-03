// https://adventofcode.com/2022/day/3

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day03/input.txt";

function parser(inputData) {
    let rucksacks = [];
    inputData.split(/\r?\n/).map((r) => {
        let c1 = r.slice(0, r.length / 2);
        let c2 = r.slice(r.length / 2);
        rucksacks.push({ c1, c2 });
    });

    return rucksacks;
}

function mission() {
    const rucksacks = getInputData(_inputPath)(parser);

    const items = getItemsThatAppearInBothCompartments(rucksacks);

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

function getItemsThatAppearInBothCompartments(rucksacks) {
    let items = [];

    rucksacks.map((r) => {
        for (let i = 0; i < r.c1.length; i++) {
            if (r.c2.includes(r.c1.charAt(i))) {
                items.push(r.c1.charAt(i));
                break;
            }
        }
    });

    return items;
}

mission();
