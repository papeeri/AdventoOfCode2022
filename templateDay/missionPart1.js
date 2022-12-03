// https://adventofcode.com/2022/day/DAYNUMBERURL

import { getInputData } from "../lib/utils.js";

const _inputPath = "./dayDAYNUMBER/inputPart.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/);
    return input;
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    console.log(input);
    console.log("End");
}

mission();
