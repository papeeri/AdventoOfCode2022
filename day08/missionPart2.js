// https://adventofcode.com/2022/day/8

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day08/input.txt";

function parser(inputData) {
    return inputData.split(/\r?\n/).map((r) => r.split("").map(Number));
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    let highestScenicScore = 0;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            let scenicScore = getScenicScore(y, x, input);

            if (scenicScore > highestScenicScore) {
                highestScenicScore = scenicScore;
            }
        }
    }

    console.log("Highest scenic score:", highestScenicScore);
}

function getScenicScore(y, x, input) {
    if (y === 0 || y === input.length - 1 || x === 0 || x === input[y].length - 1) {
        return 0;
    }

    let treesToTheLeft = getTreesToTheLeft(y, x, input);
    let visibleTreesLeft = getVisibleTrees(input[y][x], treesToTheLeft);

    let treesToTheRight = getTreesToTheRight(y, x, input);
    let visibleTreesRight = getVisibleTrees(input[y][x], treesToTheRight);

    let treesUp = getTreesUp(y, x, input);
    let visibleTreesUp = getVisibleTrees(input[y][x], treesUp);

    let treesDown = getTreesDown(y, x, input);
    let visibleTreesDown = getVisibleTrees(input[y][x], treesDown);

    return visibleTreesLeft * visibleTreesRight * visibleTreesUp * visibleTreesDown;
}

function getVisibleTrees(initialTree, trees) {
    if (trees.length === 1) {
        return 1;
    }

    let visibleTrees = 0;
    for (let i = 0; i < trees.length; i++) {
        visibleTrees++;
        if (trees[i] >= initialTree) {
            return visibleTrees;
        }
    }

    return visibleTrees;
}

function getTreesToTheLeft(y, x, input) {
    let trees = [];
    for (let i = x - 1; i >= 0; i--) {
        trees.push(input[y][i]);
    }

    return trees;
}

function getTreesToTheRight(y, x, input) {
    let trees = [];
    for (let i = x + 1; i < input[y].length; i++) {
        trees.push(input[y][i]);
    }

    return trees;
}

function getTreesUp(y, x, input) {
    let trees = [];
    for (let i = y - 1; i >= 0; i--) {
        trees.push(input[i][x]);
    }

    return trees;
}

function getTreesDown(y, x, input) {
    let trees = [];
    for (let i = y + 1; i < input.length; i++) {
        trees.push(input[i][x]);
    }

    return trees;
}

mission();
