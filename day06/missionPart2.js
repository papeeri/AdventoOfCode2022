// https://adventofcode.com/2022/day/6

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day06/input.txt";

function parser(inputData) {
    return inputData.split(/\r?\n/)[0];
}

function mission() {
    const buffer = getInputData(_inputPath)(parser);

    const firstMarkerPosition = getFirstMarkerPosition(buffer);

    console.log("First marker position:", firstMarkerPosition);
}

function getFirstMarkerPosition(buffer) {
    for (let i = 14; i < buffer.length; i++) {
        const bufferPart = buffer.substring(i - 14, i);

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
