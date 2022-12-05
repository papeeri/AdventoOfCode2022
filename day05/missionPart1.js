// https://adventofcode.com/2022/day/5

import { getInputData } from "../lib/utils.js";
import { parser } from "./parseInput.js";

const _inputPath = "./day05/input.txt";

function mission() {
    let { numberOfStacks, stacks, instructions } = getInputData(_inputPath)(parser);

    instructions.map((instruction) => {
        for (let i = 0; i < instruction.move; i++) {
            let item = stacks[instruction.from][0];
            stacks[instruction.from].splice(0, 1);
            stacks[instruction.to].unshift(item);
        }
    });

    let answer = [];
    for (let s = 1; s <= numberOfStacks; s++) {
        answer.push(stacks[s][0]);
    }

    console.log("Message:", answer.join(""));
}

mission();
