// https://adventofcode.com/2022/day/9

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day09/input.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/);
    return input;
}

// {1,1} //noop

// {2,1} //addx 3
// {3,1}

// {4,4} //addx -5
// {5,4}

// {6,-1} //noop

//  [1, 1, 1, 4]

function getXAtCycle(cycleValueArray, cycle) {
    return cycleValueArray.find((p) => p.cycles === cycle).x;
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    let x = 1;
    let cycles = 0;
    var cycleValueArray = [];

    input.map((row) => {
        let instruction = row.split(" ");
        let instructionName = instruction[0];

        if (instructionName === "noop") {
            cycles++;
            cycleValueArray.push({ cycles, x });
            return;
        }

        if (instructionName === "addx") {
            let instructionValue = parseInt(instruction[1]);

            cycles++;
            cycleValueArray.push({ cycles, x });

            cycles++;
            cycleValueArray.push({ cycles, x });

            x += instructionValue;
        }
    });

    let signalSum = 0;
    let signal = 0;
    let atCycle = 0;

    atCycle = 20;
    signal = atCycle * getXAtCycle(cycleValueArray, atCycle);
    console.log(signal);
    signalSum += signal;

    atCycle = 60;
    signal = atCycle * getXAtCycle(cycleValueArray, atCycle);
    console.log(signal);
    signalSum += signal;

    atCycle = 100;
    signal = atCycle * getXAtCycle(cycleValueArray, atCycle);
    console.log(signal);
    signalSum += signal;

    atCycle = 140;
    signal = atCycle * getXAtCycle(cycleValueArray, atCycle);
    console.log(signal);
    signalSum += signal;

    atCycle = 180;
    signal = atCycle * getXAtCycle(cycleValueArray, atCycle);
    console.log(signal);
    signalSum += signal;

    atCycle = 220;
    signal = atCycle * getXAtCycle(cycleValueArray, atCycle);
    console.log(signal);
    signalSum += signal;

    console.log("Sum: " + signalSum);
}

mission();
