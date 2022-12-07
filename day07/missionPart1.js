// https://adventofcode.com/2022/day/7

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day07/inputPart.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/);
    return input;
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    let dirs = getFileStructure(input);
    const maxSize = 100000;
    let totalSize = 0;

    for (const path of dirs.keys()) {
        let dir = dirs.get(path);
        let dirSize = 0;

        dir.map((e) => {
            if (!e.startsWith("dir")) {
                let size = Number.parseInt(e.split(" ")[0]);

                dirSize += size;
            }

            console.log(e);
        });

        console.log(dirSize);
        if (dirSize <= maxSize) {
            totalSize += dirSize;
        }
    }

    console.log("End");
}

function getFileStructure(input) {
    let paths = [];
    let dirs = new Map();

    input.map((r) => {
        if (r.startsWith("$")) {
            let command = r.split(" ")[1];
            if (command === "cd") {
                let cdPath = r.split(" ")[2];
                if (cdPath === "..") {
                    paths.pop();
                } else {
                    if (cdPath === "/") {
                        paths = [];
                        paths.push(cdPath);
                    } else {
                        paths.push(cdPath + "/");
                    }
                }
            }

            // if (r.startsWith("ls")) {
            // }
        } else {
            let path = paths.join("");

            if (!dirs.has(path)) {
                dirs.set(path, []);
            }

            dirs.get(path).push(r);
        }
    });

    removeDuplicates(dirs);

    return dirs;
}

function removeDuplicates(dirs) {
    for (const path of dirs.keys()) {
        let dir = dirs.get(path).filter(onlyUnique);
        dirs.set(path, dir);
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

mission();
