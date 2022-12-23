// https://adventofcode.com/2022/day/9

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day09/inputPart.txt";

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

    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };

    let headPositions = [head];
    let tailPositions = [tail];

    function moveTail() {
        let tailMove = { x: head.x - tail.x, y: head.y - tail.y };

        let moveX = Math.abs(head.x) - Math.abs(tail.x);
        let moveY = Math.abs(head.y) - Math.abs(tail.y);

        if (moveX > 1 && moveY > 1) {
            tail = { x: tail.x + 1, y: tail.y + 1 };
            return;
        }

        if (Math.abs(tailMove.x) > 1 || Math.abs(tailMove.y) > 1) {
            tail = {
                x: tail.x + Math.sign(tailMove.x),
                y: tail.y + Math.sign(tailMove.y),
            };
        }
    }

    function getTailVisitedPositions() {
        let tailVisitedPositions = []

        tailPositions.map(t =>)
    }

    function printTailVisitedPositions() {
        let matrix = [];
        for (let y = 4; y >= 0; y--) {
            let row = [];
            for (let x = 0; x <= 5; x++) {
                row.push(".");
            }
            matrix.push(row);
        }

        tailPositions.map((t) => {
            matrix[t.y][t.x] = "#";
        });

        for (let y = 4; y >= 0; y--) {
            console.log(matrix[y].join(""));
        }
    }

    function printPosition() {
        for (let y = 4; y >= 0; y--) {
            let row = [];
            for (let x = 0; x <= 5; x++) {
                if (y === head.y && x === head.x) {
                    row.push("H");
                    continue;
                }

                if (y === tail.y && x === tail.x) {
                    row.push("T");
                    continue;
                }

                if (y === 0 && x === 0) {
                    row.push("s");
                    continue;
                }
                row.push(".");
            }
            console.log(row.join(""));
        }
        console.log("");
    }

    printPosition();

    moves.map((m) => {
        console.log(m);
        let direction = getDirection(m.direction);
        for (let i = 0; i < m.steps; i++) {
            head = { x: head.x + direction.x, y: head.y + direction.y };
            headPositions.push(head);
            // console.log(head);
            // console.log(tail);
            printPosition();
            moveTail();
            tailPositions.push(tail);
            // console.log(head);
            // console.log(tail);

            printPosition();
        }
    });

    printTailVisitedPositions();
    let tailVisitedPositions = getTailVisitedPositions();
    // console.log(moves);
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

mission();
