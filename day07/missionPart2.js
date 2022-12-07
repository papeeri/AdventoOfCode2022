// https://adventofcode.com/2022/day/7

import { getInputData } from "../lib/utils.js";

const _inputPath = "./day07/input.txt";

function parser(inputData) {
    let input = inputData.split(/\r?\n/);
    return input;
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    let dirs = getFileStructure(input);
    const diskSpace = 70000000;
    const neededForUpgrade = 30000000;

    let dirSizes = getDirSizes(dirs);
    let freeSpace = diskSpace - dirSizes[0].totalSize;

    const needsToBeDeletet = neededForUpgrade - freeSpace;

    let totalSizeOfSmallestDirectoryNeeded = dirSizes[0].totalSize;
    dirSizes.map((dir) => {
        if (dir.totalSize > needsToBeDeletet) {
            if (dir.totalSize < totalSizeOfSmallestDirectoryNeeded) {
                totalSizeOfSmallestDirectoryNeeded = dir.totalSize;
            }
        }
    });

    console.log("Total size of smallest directory needed:", totalSizeOfSmallestDirectoryNeeded);
}

function getDirSizes(dirs) {
    let dirSizes = [];

    for (const path of dirs.keys()) {
        let dir = dirs.get(path);
        let dirSize = 0;

        dir.map((e) => {
            if (!e.startsWith("dir")) {
                let size = Number.parseInt(e.split(" ")[0]);
                dirSize += size;
            }
        });

        dirSizes.push({ path: path, size: dirSize });
    }

    dirSizes.map((dir) => {
        let children = dirSizes.filter((d) => d.path.includes(dir.path) && d.path !== dir.path);

        dir.totalSize = dir.size;
        children.map((c) => {
            dir.totalSize += c.size;
        });
    });

    return dirSizes;
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
