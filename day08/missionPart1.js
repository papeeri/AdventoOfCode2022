// https://adventofcode.com/2022/day/8

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day08/input.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/).map((r) =>
        r.split("").map((x) => {
            return { height: parseInt(x), visible: false };
        })
    );
    return input;
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input.length; x++) {
            let visible = isVisible(y, x, input);

            if (visible) {
                input[y][x].visible = true;
            }
        }
    }

    let count = 0;
    input.map((r) => {
        count += r.filter((t) => t.visible).length;
    });

    console.log(count);
}

function isVisible(y, x, input) {
    if (y === 0 || y === input.length - 1 || x === 0 || x === input[y].length - 1) {
        return true;
    }

    if (isVisibleFromTheLeft(y, x, input)) {
        return true;
    }

    if (isVisibleFromTheRight(y, x, input)) {
        return true;
    }

    if (isVisibleFromTheTop(y, x, input)) {
        return true;
    }

    if (isVisibleFromTheBottom(y, x, input)) {
        return true;
    }

    return false;
}

function isVisibleFromTheLeft(y, x, input) {
    for (let i = x - 1; i >= 0; i--) {
        if (input[y][x].height <= input[y][i].height) {
            return false;
        }
    }

    return true;
}

function isVisibleFromTheRight(y, x, input) {
    for (let i = x + 1; i < input[y].length; i++) {
        if (input[y][x].height <= input[y][i].height) {
            return false;
        }
    }

    return true;
}

function isVisibleFromTheTop(y, x, input) {
    for (let i = y - 1; i >= 0; i--) {
        if (input[y][x].height <= input[i][x].height) {
            return false;
        }
    }

    return true;
}

function isVisibleFromTheBottom(y, x, input) {
    for (let i = y + 1; i < input.length; i++) {
        if (input[y][x].height <= input[i][x].height) {
            return false;
        }
    }

    return true;
}

mission();
