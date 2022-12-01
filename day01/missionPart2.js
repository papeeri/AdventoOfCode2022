import { getInputData } from "../lib/utils.js";

const _inputPath = "./day01/input.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/);

    let elfes = [];

    let elfNumber = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "") {
            elfNumber++;
            continue;
        }

        if (!elfes[elfNumber]) {
            elfes[elfNumber] = [];
        }

        elfes[elfNumber].push(parseInt(input[i]));
    }

    return elfes;
}

function mission() {
    let elfes = getInputData(_inputPath)(parser);

    let elfesCalories = [];

    for (let e = 0; e < elfes.length; e++) {
        let elfCalories = 0;

        for (let c = 0; c < elfes[e].length; c++) {
            elfCalories += elfes[e][c];
        }

        elfesCalories.push(elfCalories);
    }

    const sortedCalories = elfesCalories.sort((a, b) => b - a);

    let totalTopThree = 0;

    for (let e = 0; e < 3; e++) {
        totalTopThree += sortedCalories[e];
    }

    console.log("Total top three:", totalTopThree);
}

mission();
