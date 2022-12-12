// https://adventofcode.com/2022/day/8

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day08/inputPart.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/).map((r) =>
        r.split("").map((x) => {
            return { height: parseInt(x) };
        })
    );
    return input;
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    let highestScenicScore = 0;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input.length; x++) {
            let scenicScore = getScenicScore(y, x, input);

            input[y][x].scenicScore = scenicScore;
            if (scenicScore > highestScenicScore) {
                highestScenicScore = scenicScore;
            }
        }
    }

    console.log("Highest scenic score:", highestScenicScore);
}

function getScenicScore(y, x, input) {
    if (y === 3 && x === 1) {
        console.log("Hej");
    }

    let visibleTreesLeft = getVisibleTreesLeft(y, x, input);
    if (visibleTreesLeft === 0) {
        return 0;
    }

    let visibleTreesRight = getVisibleTreesRight(y, x, input);
    if (visibleTreesRight === 0) {
        return 0;
    }

    let visibleTreesUp = getVisibleTreesUp(y, x, input);
    if (visibleTreesUp === 0) {
        return 0;
    }

    let visibleTreesDown = getVisibleTreesDown(y, x, input);
    if (visibleTreesDown === 0) {
        return 0;
    }

    return visibleTreesLeft * visibleTreesRight * visibleTreesUp * visibleTreesDown;
}

function getVisibleTreesLeft(y, x, input) {
    if (x === 0) {
        return 0;
    }

    if (input[y][x].height < input[y][x - 1].height) {
        return 1;
    }

    let visibleTrees = 0;
    let lastTreeHeight = 0;
    for (let i = x - 1; i >= 0; i--) {
        if (input[y][i].height >= lastTreeHeight) {
            visibleTrees++;
            lastTreeHeight = input[y][i].height;
        } else {
            return visibleTrees;
        }
    }

    return visibleTrees;
}

function getVisibleTreesRight(y, x, input) {
    if (x === input.length - 1) {
        return 0;
    }

    if (input[y][x].height < input[y][x + 1].height) {
        return 1;
    }

    let visibleTrees = 0;
    let lastTreeHeight = 0;
    for (let i = x + 1; i < input[y].length; i++) {
        if (input[y][i].height >= lastTreeHeight) {
            visibleTrees++;
            lastTreeHeight = input[y][i].height;
        } else {
            return visibleTrees;
        }
    }

    return visibleTrees;
}

function getVisibleTreesUp(y, x, input) {
    if (y === 0) {
        return 0;
    }

    if (input[y][x].height < input[y - 1][x].height) {
        return 1;
    }

    let visibleTrees = 0;
    let lastTreeHeight = 0;
    for (let i = y - 1; i >= 0; i--) {
        if (input[i][x].height >= lastTreeHeight) {
            visibleTrees++;
            lastTreeHeight = input[i][x].height;
        } else {
            return visibleTrees;
        }
    }

    return visibleTrees;
}

function getVisibleTreesDown(y, x, input) {
    if (y === input[y].length - 1) {
        return 0;
    }

    if (input[y][x].height < input[y + 1][x].height) {
        return 1;
    }

    let visibleTrees = 0;
    let lastTreeHeight = 0;
    for (let i = y + 1; i < input.length; i++) {
        if (input[i][x].height >= lastTreeHeight) {
            visibleTrees++;
            lastTreeHeight = input[i][x].height;
        } else {
            return visibleTrees;
        }
    }

    return visibleTrees;
}

mission();
