// https://adventofcode.com/2022/day/8

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day08/input.txt";

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
        for (let x = 0; x < input[y].length; x++) {
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
    if (y === 50 && x === 50) {
        console.log("Hej");
    }

    if (y === 0 || y === input.length - 1 || x === 0 || x === input[y].length - 1) {
        return 0;
    }

    let treesToTheLeft = getTreesToTheLeft(y, x, input);
    let visibleTreesLeft = getVisibleTrees(input[y][x].height, treesToTheLeft);

    let treesToTheRight = getTreesToTheRight(y, x, input);
    let visibleTreesRight = getVisibleTrees(input[y][x].height, treesToTheRight);

    let treesUp = getTreesUp(y, x, input);
    let visibleTreesUp = getVisibleTrees(input[y][x].height, treesUp);

    let treesDown = getTreesDown(y, x, input);
    let visibleTreesDown = getVisibleTrees(input[y][x].height, treesDown);

    return visibleTreesLeft * visibleTreesRight * visibleTreesUp * visibleTreesDown;
}

function getVisibleTrees(initialTree, trees) {
    if (trees.length === 1) {
        return 1;
    }

    if (trees[0] >= initialTree) {
        return 1;
    }

    let visibleTrees = 1;
    for (let i = 1; i < trees.length; i++) {
        if (trees[i] < trees[i - 1]) {
            return visibleTrees;
        }

        // if (trees[i] === trees[i - 1] && initialTree <= trees[i]) {
        //     return visibleTrees;
        // }

        visibleTrees++;
    }

    return visibleTrees;
}

function getTreesToTheLeft(y, x, input) {
    let trees = [];
    for (let i = x - 1; i >= 0; i--) {
        trees.push(input[y][i].height);
    }

    return trees;
}

function getTreesToTheRight(y, x, input) {
    let trees = [];
    for (let i = x + 1; i < input[y].length; i++) {
        trees.push(input[y][i].height);
    }

    return trees;
}

function getTreesUp(y, x, input) {
    let trees = [];
    for (let i = y - 1; i >= 0; i--) {
        trees.push(input[i][x].height);
    }

    return trees;
}

function getTreesDown(y, x, input) {
    let trees = [];
    for (let i = y + 1; i < input.length; i++) {
        trees.push(input[i][x].height);
    }

    return trees;
}

mission();
