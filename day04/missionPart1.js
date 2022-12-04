// https://adventofcode.com/2022/day/4

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day04/input.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/).map((r) =>
        r.split(",").map((e) => {
            let s = e.split("-");
            return { a: parseInt(s[0]), b: parseInt(s[1]) };
        })
    );

    return input;
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    let rangeFullyContainedInTheOther = 0;

    input.map((p) => {
        if ((p[0].a >= p[1].a && p[0].b <= p[1].b) || (p[1].a >= p[0].a && p[1].b <= p[0].b)) {
            rangeFullyContainedInTheOther++;
        }
    });

    console.log("Total of range fully contain the other:", rangeFullyContainedInTheOther);
}

mission();
