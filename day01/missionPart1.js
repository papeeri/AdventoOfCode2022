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

    let elfMostColories = 0;
    let elfNumber = 0;
    for (let e = 0; e < elfes.length; e++) {
        let elfCalories = 0;

        for (let c = 0; c < elfes[e].length; c++) {
            elfCalories += elfes[e][c];
        }

        if (elfMostColories < elfCalories) {
            elfMostColories = elfCalories;
        }

        console.log("ElfCalories:", elfCalories);
    }

    console.log("Elf with most colories has:", elfMostColories);
}

mission();
