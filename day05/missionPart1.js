// https://adventofcode.com/2022/day/5

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day05/inputPart.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/);

    const numberOfStacks = getNumberOfStacks(input[0]);

    let stacks = [];
    let instructions = [];

    for (let i = 1; i <= numberOfStacks; i++) {
        stacks[i] = [];
    }

    for (let i = 0; i < input.length; i++) {
        if (input[i].includes("[")) {
            parseStackRow(stacks, input[i], numberOfStacks);
        }

        if (input[i].includes("move")) {
            instructions.push(parseInstructionRow(input[i]));
        }
    }

    return { numberOfStacks, stacks, instructions };
}

function parseInstructionRow(row) {
    let rowSplit = row.split(" from ");

    let move = parseInt(rowSplit[0].split(" ")[1]);
    let from = parseInt(rowSplit[1].split(" to ")[0]);
    let to = parseInt(rowSplit[1].split(" to ")[1]);

    return { move, from, to };
}

function parseStackRow(stacks, row, numberOfStacks) {
    for (let s = 1; s <= numberOfStacks; s++) {
        const position = (s - 1) * 4 + 1;

        if (row[position] !== " ") {
            stacks[s].push(row[position]);
        }
    }
}

function getNumberOfStacks(firstRow) {
    return Math.ceil(firstRow.length / 4);
}

function mission() {
    let { numberOfStacks, stacks, instructions } = getInputData(_inputPath)(parser);

    console.log("End");
}

mission();
