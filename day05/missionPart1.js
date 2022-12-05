// https://adventofcode.com/2022/day/5

import { getInputData } from "../lib/utils.js";
import { parser } from "./parseInput.js";

const _inputPath = "./day05/inputPart.txt";

function mission() {
    let { numberOfStacks, stacks, instructions } = getInputData(_inputPath)(parser);

    console.log("End");
}

mission();
