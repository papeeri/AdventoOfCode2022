// https://adventofcode.com/2022/day/9

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day09/input.txt";

function parser(inputData) {
    return inputData
        .split(/\r?\n/)
        .map((row) => row.split(" "))
        .map(([direction, steps]) => {
            return { direction, steps: Number(steps) };
        });
}

function mission() {
    const moves = getInputData(_inputPath)(parser);

    let knotsAmount = 10;
    let knots = [];
    let knotPositions = [];

    initKnotsStartPosition();

    function initKnotsStartPosition() {
        for (let i = 0; i < knotsAmount; i++) {
            knots.push({ x: 0, y: 0 });
            knotPositions.push([knots[i]]);
        }
    }

    function moveTailKnot(knotNumber) {
        let knotMove = { x: knots[knotNumber - 1].x - knots[knotNumber].x, y: knots[knotNumber - 1].y - knots[knotNumber].y };

        if (Math.abs(knotMove.x) > 1 || Math.abs(knotMove.y) > 1) {
            knots[knotNumber] = {
                x: knots[knotNumber].x + Math.sign(knotMove.x),
                y: knots[knotNumber].y + Math.sign(knotMove.y),
            };
        }
    }

    function printTailVisitedPositions() {
        let matrix = [];
        for (let y = 10; y >= -10; y--) {
            let row = [];
            for (let x = -40; x <= 40; x++) {
                row.push(".");
            }
            matrix.push(row);
        }

        // for (let k = 1; k < knotsAmount; k++) {
        knotPositions[1].map((t) => {
            matrix[t.y][t.x] = "#";
        });
        // }

        for (let y = 4; y >= 0; y--) {
            console.log(matrix[y].join(""));
        }
    }

    function printPosition() {
        function getSymbol(x, y) {
            for (let k = 0; k < knotsAmount; k++) {
                if (y === knots[0].y && x === knots[0].x) {
                    return "H";
                }

                if (y === knots[k].y && x === knots[k].x) {
                    return k.toString();
                }

                if (y === 0 && x === 0) {
                    return "s";
                }
            }
            return ".";
        }

        for (let y = 10; y >= -10; y--) {
            let row = [];
            for (let x = -40; x <= 40; x++) {
                row.push(getSymbol(x, y));
            }
            console.log(row.join(""));
        }
        console.log("");
    }

    // printPosition();

    moves.map((m) => {
        // console.log(m);
        let direction = getDirection(m.direction);
        for (let i = 0; i < m.steps; i++) {
            knots[0] = { x: knots[0].x + direction.x, y: knots[0].y + direction.y };
            knotPositions[0].push(knots[0]);
            // printPosition();

            for (let k = 1; k < knotsAmount; k++) {
                moveTailKnot(k);
                knotPositions[k].push(knots[k]);
            }

            // printPosition();
        }
    });

    // printTailVisitedPositions();
    console.log("");

    let tailVisited = knotPositions[9].filter(onlyUnique);

    console.log("Tail visited positions:", tailVisited.length);
}

function getDirection(direction) {
    switch (direction) {
        case "U":
            return { x: 0, y: 1 };
        case "D":
            return { x: 0, y: -1 };
        case "L":
            return { x: -1, y: 0 };
        case "R":
            return { x: 1, y: 0 };
    }
}

function onlyUnique(value, index, self) {
    return index === self.findIndex((t) => t.x === value.x && t.y === value.y);
}

mission();
