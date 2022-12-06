// https://adventofcode.com/2022/day/6

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day06/input.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/)[0];
    return input;
}

function mission() {
    let buffer = getInputData(_inputPath)(parser);

    const firstMarkerPosition = getFirstMarkerPosition(buffer);

    console.log("First marker position:", firstMarkerPosition);
}

function getFirstMarkerPosition(buffer) {
    for (let i = 4; i < buffer.length; i++) {
        const bufferPart = buffer.substring(i - 4, i);

        if (hasDuplicates(bufferPart) === false) {
            return i;
        }
    }
}

function removeDuplicates(str) {
    return [...new Set(str)].join("");
}

function hasDuplicates(str) {
    return str !== removeDuplicates(str);
}

mission();
