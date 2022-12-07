const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  const treeSizes = generateTree(data);
  return treeSizes.filter(size => size <= 100000)
    .reduce((acc, size) => acc + size);
};

const puzzle2 = (data) => {
  const treeSizes = generateTree(data);
  const freeSpace = 70000000 - treeSizes[0];
  const neededSpace = 30000000 - freeSpace;
  return treeSizes.reduce((acc, s) => {
    if (s < acc && s > neededSpace) {
      return s;
    }
    return acc;
  }, treeSizes[0]);
};

const parseRow = (row) => {
  const [start, end, params] = row.split(" ");
  switch (start) {
    case "$":
      return { type: end, value: params };
    case "dir":
      return { type: "dir", value: end };
    default:
      return { type: "file", value: parseInt(start, 10) };
  }
};

const generateTree = (data) => {
  let currentDir = "";
  const tree = data.reduce((acc, row) => {
    const command = parseRow(row);
    switch (command.type) {
      case "cd":
        if (command.value !== "..") {
          currentDir = currentDir
            ? `${currentDir}-${command.value}`
            : command.value;
        } else {
          const splittedDir = currentDir.split("-");
          currentDir = splittedDir.slice(0, splittedDir.length - 1).join("-");
        }
        break;
      case "file":
        const splittedDir = currentDir.split("-");
        for (let i = 1; i <= splittedDir.length; i++) {
          const dir = splittedDir.slice(0, i).join("-");
          const size = acc.get(dir) || 0;
          acc.set(dir, size + command.value);
        }
        break;
    }
    return acc;
  }, new Map());
  return Array.from(tree, ([_, value]) => value).sort((a, b) => b - a)
};

run("07", puzzle1, puzzle2);
