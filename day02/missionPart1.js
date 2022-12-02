// https://adventofcode.com/2022/day/2

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day02/input.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/);

    let rounds = [];
    input.map((r) => {
        rounds.push({ opponent: getShape(r.split(" ")[0]), me: getShape(r.split(" ")[1]) });
    });

    return rounds;
}

function getShape(choice) {
    if (choice === "A" || choice === "X") {
        return "rock";
    }

    if (choice === "B" || choice === "Y") {
        return "paper";
    }

    if (choice === "C" || choice === "Z") {
        return "scissor";
    }
}

function mission() {
    const rounds = getInputData(_inputPath)(parser);

    let totalScore = 0;
    rounds.map((r) => (totalScore += getScore(r)));

    console.log("Total score:", totalScore);
}

function getScore(round) {
    const myScoreForMyShape = getScoreForShape(round.me);
    const winningScore = getWinningScore(round.me, round.opponent);

    return myScoreForMyShape + winningScore;
}

function getWinningScore(me, opponent) {
    // Draw
    if (me === opponent) {
        return 3;
    }

    // Win
    if (me === "rock" && opponent === "scissor") {
        return 6;
    }

    if (me === "paper" && opponent === "rock") {
        return 6;
    }

    if (me === "scissor" && opponent === "paper") {
        return 6;
    }

    // Lost
    return 0;
}

function getScoreForShape(shape) {
    switch (shape) {
        case "rock":
            return 1;
        case "paper":
            return 2;
        case "scissor":
            return 3;
    }
}

mission();
